require 'rails_helper'

RSpec.feature 'Feature - new creation infos', :js do
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
      select_type('picture')
    }

    scenario 'the creation info fields are visible' do
      expect(page).to have_field('name')
      expect(page).to have_field('description')
      expect(page).to have_css('#creation-year')
      expect(page).to have_field('materials')
      expect(page).to have_field('image', visible: false)
      expect(page).to have_css('div.category')
    end

    scenario 'the creation info fields are saveable' do
      fill_infos

      expect(page.current_path).to eq(new_creation_infos_path)
    end

    scenario 'the creation info fields are validated' do
      find('#creation-save-infos').click

      expect(page.current_path).to eq(new_creation_infos_path)

      expect(page).to have_css('div.error-name')
      expect(page).to have_css('div.error-description')
      expect(page).to have_css('div.error-year')
      #expect(page).to have_css('div.error-materials')
      expect(page).to have_css('div.error-image')
      expect(page).to have_css('div.error-categories')
    end

    context 'navigation' do
      scenario 'kind step is navigable' do
        find('#step-kind').click

        expect(page.current_path).to eq(new_creation_kind_path)
      end

      scenario 'Creation step is navigable' do
        find('#step-creation').click

        expect(page.current_path).to eq(new_creation_creation_path)
      end

      scenario 'registration step is not navigable' do
        find('#step-registration').click

        expect(page.current_path).to eq(new_creation_infos_path)
      end

      scenario 'the page is not refreshable nor navigable from the URL' do
        visit(new_creation_infos_path)

        expect(page.current_path).to eq(new_creation_kind_path)
      end
    end
  end
end