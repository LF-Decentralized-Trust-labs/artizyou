require 'rails_helper'

RSpec.feature 'Feature - new profile', :js do
  let(:user) {create(:user, state: 'Quebec', address: '225 Rue Test Bureau 2000, Sherbrooke, QC, Canada G1X 2P3')}
  let(:new_activity){'Musician'}
  let(:new_address){'214 Avenue Saint-Sacrement Suite 110, Québec City, QC, Canada G1N 3X6'}
  let(:new_city){'Salvador'}
  let(:new_state){'Salvador'}
  let(:new_description){'Better description'}
  let(:new_first_name){'Wayne'}
  let(:new_last_name){'Gretzky'}
  let(:new_username){'waynegretzky'}

  let(:old_activity){'Painter'}
  let(:old_address){'225 Rue Test Bureau 2000, Sherbrooke, QC, Canada G1X 2P3'}
  let(:old_city){'Quebec'}
  let(:old_state){'Quebec'}
  let(:old_country){'CA'}
  let(:old_description){'Ma description'}
  let(:old_first_name){'Alexandre'}
  let(:old_last_name){'Zicat'}
  let(:old_username){'alexzicat'}

  background {
    setup_domain_values
    request_user_sign_in(user)
    visit(edit_profile_path)
  }

  scenario 'the form is filled with the user infos' do
    expect(page).to have_content(old_username)
    expect(find_field('firstName').value).to eq(old_first_name)
    expect(find_field('lastName').value).to eq(old_last_name)
    expect(page).to have_content(old_activity)
    expect(page).to have_content('Canada')
    expect(find_field('address').value).to eq(old_address)
    expect(find_field('city').value).to eq(old_city)
    expect(find_field('state').value).to eq(old_state)
    expect(find_field('description').value).to eq(old_description)
    expect(page).to have_content('English')
  end

  scenario 'the user can edit its information' do
    expect(user.username).to eq(old_username)
    expect(user.first_name).to eq(old_first_name)
    expect(user.last_name).to eq(old_last_name)
    expect(user.activity).to eq(old_activity)
    expect(user.country).to eq(old_country)
    expect(user.city).to eq(old_city)
    expect(user.state).to eq(old_state)
    expect(user.description).to eq(old_description)
    expect(user.language).to eq('en')

    fill_in(:firstName, with: new_first_name)
    fill_in(:lastName, with: new_last_name)
    fill_in(:username, with: new_username)
    react_select('#activity', new_activity)
    react_select('#country', 'Canada')
    fill_in(:city, with: new_city)
    fill_in(:state, with: new_state)
    fill_in(:address, with: new_address)
    fill_in(:description, with: new_description)
    react_select('#language', 'French')
    find('#save-profile-form').click

    click_button('Sauvegarder')

    expect(page).to have_content('Vos créations')
    visit(edit_profile_path)
    
    user.reload

    expect(user.username).to eq(new_username)
    expect(user.first_name).to eq(new_first_name)
    expect(user.last_name).to eq(new_last_name)
    expect(user.activity).to eq(new_activity)
    expect(user.country).to eq('CA')
    expect(user.city).to eq(new_city)
    expect(user.state).to eq(new_state)
    expect(user.address).to eq(new_address)
    expect(user.description).to eq(new_description)
    expect(user.language).to eq('fr')
  end

  scenario 'the user fields are validated' do
    fill_in(:firstName, with: '')
    fill_in(:lastName, with: '')
    fill_in(:username, with: '')
    fill_in(:city, with: '')
    fill_in(:address, with: '')
    fill_in(:description, with: '')
    
    click_button('Save')

    expect(page).to have_css('div.error-username')
    expect(page).to have_css('div.error-firstName')
    expect(page).to have_css('div.error-lastName')
    expect(page).to have_css('div.error-city')
    expect(page).to have_css('div.error-address')
    expect(page).to have_css('div.error-description')
  end

  context 'user without completed profile' do
    let(:user) {create(:user, :without_infos)}

    scenario 'the user is redirected to new' do
      expect(page).to have_content('Your profile')
      expect(page.current_path).to eq('/profile/new')
    end
  end
end