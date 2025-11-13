require 'rails_helper'

RSpec.describe CreationsController, type: :controller do
  let(:creation) {build(:creation, :image, user: user)}
  let(:creations_assoc) {double(:creations_assoc)}
  let(:id) {'1'}
  let(:user) {create(:user)}

  before(:each, :authenticated) {
    controller_user_sign_in(user)
    expect(user).to receive(:creations).and_return(creations_assoc)
  }

  context '#create' do
    let(:categories_param) {%w(1 2)}
    let(:operating_territories_param) {%w(CM CA GB)}
    let(:params) {{creation: {name: 'name', description: 'description'}, categories: categories_param, operating_territories: operating_territories_param}}
    let(:strong_params) {ActionController::Parameters.new(params).require(:creation).permit(:categories, :name, :description)}

    context 'valid payload', :authenticated do
      let(:categories) {build_list(:category, 2)}

      it 'updates the user' do
        expect(creations_assoc).to receive(:create!).with(strong_params).and_return(creation)
        expect(Category).to receive(:where).with(id: categories_param).and_return(categories)
        expect(creation).to receive(:categories=).with(categories)
        #expect(params).to receive(:map).with

        put :create, params: {id: id, **params}

        expect(response.status).to be(200)
        expect(response.body).to eq(Creations::Serializer.serialize(creation).to_json)
      end
    end

    context 'invalid payload', :authenticated do
      it 'returns a 400 error' do
        expect(creations_assoc).to receive(:create!).with(strong_params).and_raise {Exception}

        put :create, params: {id: id, **params}

        expect(response.status).to be(400)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        put :create, params: {id: id, **params}
      end
    end
  end

  context '#pay' do
    let(:token) {'token'}
    let(:totalAmount) {"98.31"}

    context 'authenticated', :authenticated do
      let(:payment_terms) {DateTime.now}
      let(:order_number) {'AY12345-2'}
      let(:paidWithoutTaxes) {"85.50"}
      let(:taxes) {"{name: 'TPS', amount: 4.275}, {name: 'TVQ', amount: 8.5329}"}

      before {
        expect(creations_assoc).to receive(:find).with(id).and_return(creation)
        expect(Payment::Stripe).to receive(:charge).with(creation, token, totalAmount).and_return([status, msg_code])
      }

      context 'stripe payment passed' do
        let(:status) {200}
        let(:msg_code) {'success'}

        it 'pays for the registration and send email' do
          expect(creation).to receive(:paid_without_taxes=).with(paidWithoutTaxes)
          expect(creation).to receive(:taxes=).with(taxes)
          expect(creation).to receive(:payment_terms=).with(payment_terms.to_s)
          expect(creation).to receive(:payment_date=).with(an_instance_of(DateTime))
          expect(subject).to receive(:generate_order_number).with(creation.id).and_return(order_number)
          expect(creation).to receive(:order_number=).with(order_number)
          expect(subject).to receive(:send_notification_email).with(creation)
          expect(creation).to receive(:save!)

          post :pay, params: {id: id, token: token}

          expect(response.status).to be(200)
          expect(response.body).to eq({msgCode: msg_code, status: status, chargeId: creation.charge_id, paymentTerms: nil}.to_json)
        end
      end

      context 'stripe payment failed' do
        let(:status) {400}
        let(:msg_code) {'error'}

        it 'returns an error message' do
          expect(creation).not_to receive(:paid_without_taxes=)
          expect(creation).not_to receive(:taxes=)
          expect(creation).not_to receive(:payment_terms=)
          expect(creation).not_to receive(:payment_date=)
          expect(subject).not_to receive(:generate_order_number)
          expect(creation).not_to receive(:order_number)
          expect(subject).not_to receive(:send_notification_email)
          expect(creation).not_to receive(:save!)

          post :pay, params: {id: id, token: token}

          expect(response.status).to be(200)
          expect(response.body).to eq({msgCode: msg_code, status: status, chargeId: creation.charge_id, paymentTerms: nil}.to_json)
        end
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        post :register, params: {id: id, token: token}
      end
    end
  end

  context '#register' do
    context 'authenticated', :authenticated do
      let(:data_hash) {'nmb4jbk45b4k342fd'}
      let(:file_hash) {'dr5t6yuhr567iujk'}
      let(:tx_hash) {'dr5t6yuhr567iujk'}

      it 'registers the creation' do
        expect(creations_assoc).to receive(:find).with(id).and_return(creation)
        data = double('data')
        expect(controller).to receive(:open) {data}
        expect(Blockchain::Base).to receive(:hash).with(data).and_return(file_hash)
        expect(Blockchain::Base).to receive(:hash).with({createdAt: creation.created_at, file: file_hash}.to_json).and_return(data_hash)
        expect(Blockchain::Base).to receive(:register).with(data_hash).and_return(tx_hash)
        expect(creation).to receive(:update!).with({tx_hash: tx_hash, registration_date: DateTime.now})

        post :register, params: {id: id}

        expect(response.status).to be(200)
        expect(response.body).to eq(Creations::Serializer.serialize(creation).to_json)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        post :register, params: {id: id}
      end
    end
  end

  context '#confirm_registration' do
    context 'authenticated' do
      let(:contract_address) {'tryuhb4klj4k5bln54'}
      let(:tx_hash) {'dr5t6yuhr567iujk'}

      it 'registers the creation' do
        expect(Creation).to receive(:find_by).with(tx_hash: tx_hash).and_return(creation)
        expect(creation).to receive(:update!).with(contract_address: contract_address)

        post :confirm_registration, params: {contract_address: contract_address, tx_hash: tx_hash}

        expect(response.status).to be(200)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        post :register, params: {id: id}
      end
    end
  end

  context '#registration_error' do
    context 'authenticated' do
      let(:error) {'error message'}
      let(:tx_hash) {'dr5t6yuhr567iujk'}

      it 'registers the creation' do
        expect(Creation).to receive(:find_by).with(tx_hash: tx_hash).and_return(creation)
        expect(creation).to receive(:update!).with(blockchain_error: error)

        post :registration_error, params: {error: error, tx_hash: tx_hash}

        expect(response.status).to be(200)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        post :register, params: {id: id}
      end
    end
  end

  context '#certify' do
    context 'authenticated', :authenticated do
      let(:certificate) {'certificate'}
      let(:pdf_path) {Rails.root.join('public', 'certificats', 'generated.pdf')}
      let(:wicked_pdf) {double(WickedPdf)}
      let(:zip_path) {Rails.root.join('public', 'certificats', 'generated.zip')}

      before(:each) {
        expect(creations_assoc).to receive(:find).with(id).and_return(creation)
        expect(subject).to receive(:render_to_string).with('creations/certify', layout: false, locals: {creation: creation}).and_return(certificate)
        expect(WickedPdf).to receive(:new).and_return(wicked_pdf)
        expect(wicked_pdf).to receive(:pdf_from_string).with(certificate, {
            print_media_type: true,
            page_size: 'Letter',
            margin: {top: 0, bottom: 0, left: 0, right: 0}
        }).and_return(wicked_pdf)
        expect(Zip::Archive).to receive(:open).with(zip_path.to_s, Zip::CREATE)
      }

      context 'for a new certificate' do
        before(:each) {
          expect(File).to receive(:exists?).with(pdf_path).and_return(false)
          expect(File).to receive(:exists?).with(zip_path).and_return(false)
          expect(File).not_to receive(:delete)
        }

        context 'without a password' do
          it 'render the pdf from the template' do
            expect(Zip::Archive).not_to receive(:encrypt)

            post :certify, params: {id: id}

            expect(response.status).to be(200)
            expect(response.body).to eq(File.read(zip_path))
          end
        end

        context 'with a password' do
          let(:password) {'a password'}

          it 'render the pdf from the template' do
            expect(Zip::Archive).to receive(:encrypt).with(zip_path.to_s, password)

            post :certify, params: {id: id, password: password}

            expect(response.status).to be(200)
            expect(response.body).to eq(File.read(zip_path))
          end
        end
      end

      context 'with an existing certificate' do
        before(:each) {
          expect(File).to receive(:exists?).with(pdf_path).and_return(true)
          expect(File).to receive(:delete).with(pdf_path)
          expect(File).to receive(:exists?).with(zip_path).and_return(true)
          expect(File).to receive(:delete).with(zip_path)
        }

        context 'without a password' do
          it 'render the pdf from the template' do
            expect(Zip::Archive).not_to receive(:encrypt)

            post :certify, params: {id: id}

            expect(response.status).to be(200)
            expect(response.body).to eq(File.read(zip_path))
          end
        end

        context 'with a password' do
          let(:password) {'a password'}

          it 'render the pdf from the template' do
            expect(Zip::Archive).to receive(:encrypt).with(zip_path.to_s, password)

            post :certify, params: {id: id, password: password}

            expect(response.status).to be(200)
            expect(response.body).to eq(File.read(zip_path))
          end
        end
      end
    end
  end
end