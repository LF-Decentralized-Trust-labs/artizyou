require 'rails_helper'

RSpec.feature 'Feature - show creation', :js do

  let(:creation_type) {create(:creation_type)}
  let(:creation) {create(:creation, image: File.open("#{Rails.root}/spec/fixtures/test-image.png"), name: 'patate', user: user, creation_type: creation_type)}
  let(:plagiats) {create_list(:plagiat, 1, creation_id: creation.id, url: 'http://plagiat.com')}
  let(:user) {create(:user, onboarding: false)}

  background {
    create_categories
    create_creation_types

    request_user_sign_in(user)
    visit(creation_path(creation.id))
  }

  context 'general behavior of creation page' do
    scenario 'I should see creation name' do
      expect(page).to have_content(creation.name)
    end
  end

  context 'creation is not registered in blockchain' do
    it 'does not have a certificate link' do
      expect(page).not_to have_css('#certificate-link')
    end
  end

  context 'creation is registered in blockchain' do
    let(:creation) {create(:creation, image: File.open("#{Rails.root}/spec/fixtures/test-image.png"), name: 'patate', user: user, creation_type: creation_type, tx_hash: "DID00S023RNNFLNSV0DV0SDVOXAC30", registration_date: Time.now.to_date)}

    it 'has a certificate link and we open the modal and we generate the certificate' do
      find('#certificate-link').click

      fill_in('pdf_password', with: 'texmex')

      find('#generate-cert-btn').click
    end
  end
end