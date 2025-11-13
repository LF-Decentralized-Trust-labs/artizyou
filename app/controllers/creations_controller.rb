require "digest"
require "blockchain/base"
require "creations/serializer"
require "payment/stripe"
require "open-uri"
require "artizyou_api/base"
class CreationsController < ApplicationController
  before_action :authenticate_user!, except: [:confirm_registration, :registration_error, :blockchain_register, :scan]
  before_action :find_creation, only: [:pay, :register, :blockchain_register, :plagiats, :confirm_registration, :registration_error, :scan]
  skip_before_action :verify_authenticity_token, only: [:confirm_registration, :registration_error]

  def create
    creation = current_user.creations.create(creation_params)
    creation.categories = Category.where(id: params[:categories].delete_if{|item| item == 'other'})
    if params[:other_category].present? && params[:other_category] != 'undefined' 
      category = Category.create!(name_fr: params[:other_category], name_en: params[:other_category])
      creation.categories << category
    end
    params[:operating_territories].map { |c| creation.creation_territories.build(country_code: c) } if params[:operating_territories]
    params[:published_territories].map { |c| creation.creation_territories.build(country_code: c) } if params[:published_territories]
    creation.qr_code = QrCodeGenerator.new(scan_creation_url(creation, date: creation.created_at)).generate_qrcode
    creation.save!

    render json: Creations::Serializer.serialize(creation)
  rescue Exception => error
    p error
    head(:bad_request)
  end

  def scan
    @date = Time.zone.parse(params[:date]) if params[:date]
  end

  def update
    creation = current_user.creations.find(params[:id])
    categories = params[:categories]
    if params[:other_category] && params[:categories].include?('other')
      other_category = creation.categories.find_by(main: false)
      if other_category.present?
        other_category.update(name_en: params[:other_category], name_fr: params[:other_category])
      else
        other_category = creation.categories.create(name_en: params[:other_category], name_fr: params[:other_category])
      end
      categories.reject! { |item| item == 'other' }
      categories << other_category.id
    else
      other_category = creation.categories.find_by(main: false)
      other_category.destroy if other_category.present?
    end
    creation.categories = Category.where(id: params[:categories])
    creation.categories.reload

    render json: Creations::Serializer.serialize(creation)
  rescue Exception => error
    Rails.logger.error(error)
    head(:bad_request)
  end

  def update_authors_owners
    creation = current_user.creations.find(params[:id])
    creation.update(creation_params)

    render json: Creations::Serializer.serialize(creation)
  rescue Exception => error
    Rails.logger.error(error)
    head(:bad_request)
  end

  def delete_author
    creation = current_user.creations.find(params[:id])
    creation.authors.find(params[:author_id].to_i).delete

    render json: Creations::Serializer.serialize(creation)
  rescue Exception => error
    Rails.logger.error(error)
    head(:bad_request)
  end

  def exclude_plagiarism_detection
    creation = current_user.creations.find(params[:id])
    plagiat = creation.plagiats.find(params[:plagiat_id])
    plagiat.update(:excluded => true)

    render json: Creations::Serializer.serialize(creation)
  rescue Exception => error
    Rails.logger.error(error)
    head(:bad_request)
  end

  def payment_intent
    card = StripeService.new(current_user).add_card(params[:token], current_user.email, current_user.username, params[:last_four_digit]) if params[:token]
    card = Card.find_by(card_id: params[:card_id]) if params[:card_id]
    payment_intent = StripeService.new(current_user, card.card_id).create_payment_intent(params[:amount], params[:currency])
    render json: { id: payment_intent.id, client_secret: payment_intent.client_secret, status: payment_intent.status, card: params[:card_id] || current_user.cards.last.card_id}
  end

  def pay
    user_plan = current_user.user_plan
    if @creation.charge_id.present?
      render json: { msgCode: "already_paid", status: 200, chargeId: @creation.charge_id, paymentTerms: @creation.payment_date }
      return
    end

    payment_terms = nil

    payment_terms = DateTime.now

    @creation.paid_without_taxes = params[:amount]
    @creation.taxes = user_plan.taxes
    @creation.payment_terms = payment_terms
    @creation.encryption_terms = payment_terms
    @creation.automatic_payment_terms = payment_terms
    @creation.payment_date = payment_terms
    @creation.order_number = @creation.generate_order_number
    @creation.charge_id = params[:payment_intent_id]
    @creation.paid = params[:amount]
    @creation.save!

    send_notification_email(@creation)

    render json: { msgCode: 'success', status: 200, chargeId: params[:payment_intent_id], paymentTerms: payment_terms }
  end

  # def register
  #   if @creation.registered_state.present?
  #     render json: Creations::Serializer.serialize(@creation)
  #     return
  #   end

  #   @creation.update!(registration_date: DateTime.now, registered_state: 'requested')
  #   current_user.increment_registered_creations

  #   unless current_user.user_plan.default?
  #     send_notification_email(@creation)
  #   end

  #   if @creation.document.present?
  #     doc = @creation.document
  #   else
  #     doc = @creation.image
  #   end

  #   file_hash = Blockchain::Base.hash(open(doc.expiring_url(30)) {|f| f.read})
  #   fingerprint = Blockchain::Base.hash({createdAt: @creation.created_at, file: file_hash}.to_json)
  #   @creation.update!(fingerprint: fingerprint, registered_state: 'pending')

  #   #If the required amount of creations are ready to be registered in the blockchain, or if a creation hasn't been registered in 30 days
  #   if Creation.where(master_hash_id: nil, contract_address: nil).count == MasterHash.hash_amount or (DateTime.now.to_date - Creation.where(master_hash_id: nil, contract_address: nil).first.created_at.to_date).to_i >= 30
  #     create_master_hash
  #   end

  def register
    custody = false
    status_code = ArtizyouAPI::Base.register(@creation.id, false)

    if (status_code == 200)
      current_user.increment_registered_creations
      @creation.update!(registration_date: DateTime.now)
      ArtizyouAPI::Base.plagiarismChecker(@creation.id)
      render json: { status: :ok, message: "Successfully registered!", creation: Creations::Serializer.serialize(@creation) }
    else
      render json: { status: :error, message: "Error has occurred", creation: @creation }
    end
  end

  def create_master_hash
    master_hash = MasterHash.create(status: "created")
    hash_list = []
    creations = Creation.where(master_hash_id: nil, contract_address: nil)
    creations.each do |creation|
      creation.update!(master_hash_id: master_hash.id)
      hash_list.append(creation.fingerprint)
    end
    fingerprint = Blockchain::Base.hash({ createdAt: master_hash.created_at, files: hash_list }.to_json)
    @creation.update!(fingerprint: fingerprint)

    Blockchain::Base.register(fingerprint, master_hash.id)

    master_hash.update!(status: "submitted")
  end

  def blockchain_register
    base_register(@creation)

    render json: Creations::Serializer.serialize(@creation)
  end

  def base_register(creation)
    creation.update!(registration_date: DateTime.now, registered_state: "requested")

    if creation.document.present?
      doc = creation.document
    else
      doc = creation.image
    end

    file_hash = Blockchain::Base.hash(open(doc.expiring_url(30)) { |f| f.read })
    fingerprint = Blockchain::Base.hash({ createdAt: creation.created_at, file: file_hash }.to_json)

    tx_hash = Blockchain::Base.register(fingerprint, creation.id)

    creation.update!(tx_hash: tx_hash, registration_date: DateTime.now, registered_state: "building")
  end

  def confirm_registration
    @creation.update!(contract_address: params[:contract_address],
                      registration_date: DateTime.now, registered_state: "registered")

    head(200)
  end

  def registration_error
    @creation.update!(blockchain_error: params[:error], tx_hash: params[:tx_hash])

    BlockchainMailer.with(creation: @creation, error: params[:error], user: @creation.user).error.deliver_now

    head(200)
  end

  def plagiats
    render json: @creation.plagiats
  end

  def certify
    @creation = current_user.creations.includes([:authors]).find(params[:id])

    data = render_to_string("creations/certify", layout: false, locals: { creation: @creation })

    pdf = WickedPdf.new.pdf_from_string(data, {
      print_media_type: true,
      page_size: "Letter",
      margin: { top: 0, # default 10 (mm)
                bottom: 0,
                left: 0,
                right: 0 },
    })

    pdf_path = Rails.root.join("public", "certificats", "generated.pdf")
    File.delete(pdf_path) if File.exists?(pdf_path)
    File.open(pdf_path, "wb") { |file| file << pdf }

    zip_path = Rails.root.join("public", "certificats", "generated.zip")
    File.delete(zip_path) if File.exists?(zip_path)
    Zip::Archive.open(zip_path.to_s, Zip::CREATE) do |ar|
      ar.add_file(pdf_path.to_s) # add file to zip archive
    end

    if params[:password] === "null"
      params[:password] = nil
    end

    if params[:password].present?
      Zip::Archive.encrypt(zip_path.to_s, params[:password])
    end

    # zip_path = Rails.root.join('public', 'certificats', "generated.zip")
    send_data(File.open(zip_path).read,
              disposition: "inline",
              type: "application/octet-stream",
              filename: zip_path.basename.to_s)
  end

  private

  def creation_params
    params.require(:creation).permit(
      :author,
      :id,
      :description,
      :document,
      :first_market_use,
      :image,
      :kind,
      :creation_type_id,
      :materials,
      :name,
      :operating_territories,
      :owner,
      :published_territories,
      :publication_year,
      :publication_date,
      :taxes,
      :text_extract,
      :paid,
      :accepted_terms,
      :video,
      :audio,
      # :proof_of_invention,
      # :corresponding_to_customer_number,
      # :corresponding_to_firm_orindividual,
      # :customer_number,
      # :user_address,
      # :user_city,
      # :user_state,
      # :user_zip,
      # :user_country,
      # :user_phone,
      # :email,
      :virtual_object,
      :creation_date,
      # :date_of_invention,
      authors_attributes: [:id, :address, :city, :first_name, :is_org, :last_name, :mail, :org_name, :state, :type, :zip],
    )
  end

  def find_creation
    @creation = Creation.find(params[:id] || params[:creation_id])
  end

  def send_notification_email(creation)
    mailer = ApplicationMailer.with(user: current_user, creation: creation)
    if (creation.paid.present?)
      mailer = mailer.new_creation_notification
    else
      mailer = mailer.new_creation_with_promo_notification
    end
    mailer.deliver_now
  end
end
