require 'rails_helper'

RSpec.feature 'Feature - new creation registration', :js do
  let(:user) {create(:user, state: 'Quebec', accepted_terms: true)}

  background {
    create_categories
    create_creation_types

    request_user_sign_in(user)
    visit(new_creation_kind_path)
  }

  context 'image' do
    background {
      select_kind('image')
      select_type('picture')
      fill_infos
    }

    scenario 'the registrations options are visible' do
      expect(page.current_path).to eq(new_creation_registration_path)
      expect(page).to have_css('#registration-pay')
      expect(page).to have_css('#registration-pay-later')
    end

    context 'with payment' do
      context 'validations' do
        scenario 'The card owner field is validated' do
          find('#creation-save-registration').click

          expect(page).to have_css('div.error-cardOwner')
          expect(page).to have_css('div.error-notification', text: 'stripe.card_owner_error')
        end

        scenario 'The stripe fields are validated' do
          fill_in('cardOwner', with: 'Alexandre Zicat')

          find("#paymentAcceptedTerms").click
          find('#creation-save-registration').click

          expect(page).not_to have_css('div.error-cardOwner')
          expect(page).to have_css('div.error-notification', text: 'generic_error')
        end
      end
    end

    context 'without payment' do
      scenario 'the creation is saveable' do
        find('#registration-pay-later').click
        find('#creation-save-no-registration').click

        expect(page).to have_content("Your creations")

        creation_id = Creation.all.order(:id).last.id

        expect(page).to have_xpath("//a[@href='/creations/#{creation_id}']")

        expect(page.current_path).to eq(creations_path)
      end
    end

    context 'navigation' do
      scenario 'kind step is navigable' do
        find('#step-kind').click

        expect(page.current_path).to eq(new_creation_kind_path)
      end

      scenario 'infos step is navigable' do
        find('#step-infos').click

        expect(page.current_path).to eq(new_creation_infos_path)
      end

      scenario 'creation step is navigable' do
        find('#step-creation').click

        expect(page.current_path).to eq(new_creation_creation_path)
      end

      scenario 'the page is not refreshable nor navigable from the URL' do
        visit(new_creation_creation_path)

        expect(page.current_path).to eq(new_creation_kind_path)
      end
    end
  end
end