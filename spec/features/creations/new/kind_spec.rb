require 'rails_helper'

RSpec.feature 'Feature - new creation kind', :js do
  let(:user) {create(:user)}

  background {
    request_user_sign_in(user)
    visit(new_creation_kind_path)
  }

  scenario 'the creation kinds are visible' do
    expect(page).to have_content('Image')
    expect(page).to have_content('Text')
    expect(page).to have_content('Art')
    expect(page).to have_content('Digital')
  end

  scenario 'image is selectable' do
    find('#kind-image').click

    expect(page.current_path).to eq(new_creation_creation_path)
  end

  scenario 'text is selectable' do
    find('#kind-text').click

    expect(page.current_path).to eq(new_creation_creation_path)
  end

  context 'navigation' do
    scenario 'infos step is not navigable' do
      find('#step-infos').click

      expect(page.current_path).to eq(new_creation_kind_path)
    end

    scenario 'creation step is not navigable' do
      find('#step-creation').click

      expect(page.current_path).to eq(new_creation_kind_path)
    end

    scenario 'registration step is not navigable' do
      find('#step-registration').click

      expect(page.current_path).to eq(new_creation_kind_path)
    end
  end
end