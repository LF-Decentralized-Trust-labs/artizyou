class MasterHashesController < ApplicationController
  before_action :set_master_hash
  skip_before_action :verify_authenticity_token, only: [:confirm_registration, :registration_error]

  # GET /master_hashes/1
  # GET /master_hashes/1.json
  def show
  end

  # POST /master_hashes
  # POST /master_hashes.json
  def create
    @master_hash = MasterHash.new(master_hash_params)

    respond_to do |format|
      if @master_hash.save
        format.html { redirect_to @master_hash, notice: 'Master hash was successfully created.' }
        format.json { render :show, status: :created, location: @master_hash }
      else
        format.html { render :new }
        format.json { render json: @master_hash.errors, status: :unprocessable_entity }
      end
    end
  end

  def confirm_registration
    @master_hash.update!(contract_address: params[:contract_address], tx_hash: params[:tx_hash], status: 'registered')
    @master_hash.creations.each do |creation|
      creation.update!(contract_address: params[:contract_address], tx_hash: params[:tx_hash], registration_date: DateTime.now, registered_state: 'registered')
    end

    head(200)
  end


  def registration_error
    @master_hash.update!(blockchain_error: params[:error], tx_hash: params[:tx_hash])

    BlockchainMailer.with(creation: @creation, error: params[:error], user: @creation.user).error.deliver_now

    head(200)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_master_hash
      @master_hash = MasterHash.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def master_hash_params
      params.require(:master_hash).permit(:contract_address, :tx_hash, :status)
    end
end
