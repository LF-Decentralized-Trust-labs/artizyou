require 'rails_helper'

RSpec.feature 'Feature - new creation Creation step', :js do
  let(:user) {create(:user)}

  background {
    create_categories
    create_creation_types

    request_user_sign_in(user)
    visit(new_creation_kind_path)
  }

  context 'image' do
    background {
      select_kind('image')
    }

    scenario 'the creation type are visible' do
      expect(page).to have_css('#type-picture')
    end

    scenario 'the creation license is saveable' do
      select_type('picture')
      expect(page.current_path).to eq(new_creation_infos_path)
    end

    context 'navigation' do
      scenario 'kind step is navigable' do
        find('#step-kind').click

        expect(page.current_path).to eq(new_creation_kind_path)
      end

      scenario 'infos step is navigable' do
        find('#step-infos').click

        expect(page.current_path).to eq(new_creation_creation_path)
      end

      scenario 'registration step is not navigable' do
        find('#step-registration').click

        expect(page.current_path).to eq(new_creation_creation_path)
      end

      scenario 'the page is not refreshable nor navigable from the URL' do
        visit(new_creation_creation_path)

        expect(page.current_path).to eq(new_creation_kind_path)
      end
    end
  end
end