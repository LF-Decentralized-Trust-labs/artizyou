require 'rails_helper'

RSpec.feature 'Feature - new profile', :js do
  let(:id) {'1'}
  let(:save_button) {'Save'}
  let(:fr_save_button) {'Sauvegarder'}
  let(:firstName) {'Alex'}
  let(:lastName) {'Zicat'}
  let(:username) {'patateslug'}
  let(:address){'214 Avenue Saint-Sacrement Suite 110, Québec City, QC, Canada G1N 3X6'}
  let(:city) {'some city'}
  let(:state) {'Quebec'}
  let(:description) {'some description of something'}
  let(:user) {create(:user, :without_infos, id: id)}

  background {
    setup_domain_values
    request_user_sign_in(user)
    visit(new_profile_path)
  }

  scenario 'the form is visible' do
    expect(page).to have_field('firstName')
    expect(page).to have_field('lastName')
    expect(page).to have_button(save_button)
  end

  scenario 'the user can save his informations' do
    expect(user.first_name).to eq(nil)
    expect(user.last_name).to eq(nil)

    fill_in(:firstName, with: firstName)
    fill_in(:lastName, with: lastName)
    fill_in(:username, with: username)
    react_select('#activity', 'Painter')
    react_select('#country', 'Canada')
    fill_in(:city, with: city)
    fill_in(:state, with: state)
    fill_in(:address, with: address)
    fill_in(:description, with: description)
    react_select('#language', 'French')
    find("#acceptedTerms").click

    click_button(fr_save_button)

    expect(page).to have_content('Vos créations')

    user.reload

    expect(user.first_name).to eq(firstName)
    expect(user.last_name).to eq(lastName)
    expect(user.username).to eq(username)
    expect(user.activity).to eq('Painter')
    expect(user.country).to eq('CA')
    expect(user.city).to eq(city)
    expect(user.state).to eq(state)
    expect(user.address).to eq(address)
    expect(user.description).to eq(description)
    expect(user.language).to eq('fr')

    page.go_back

    expect(page).to have_content('Éditer votre profil')
    expect(page.current_path).to eq('/profile/edit')
  end

  scenario 'the user fields are validated' do
    click_button(save_button)

    expect(page).to have_content('Complete your profile to gain visibility')

    expect(page).to have_css('div.error-firstName')
    expect(page).to have_css('div.error-lastName')
  end

  context 'user with completed profile' do
    let(:user) {create(:user)}
    
    scenario 'the user is redirected to edit' do
      expect(page).to have_content('Edit profile')
      expect(page.current_path).to eq('/profile/edit')
    end
  end
end