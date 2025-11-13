# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string(255)
#  last_name              :string(255)
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string(255)
#

require 'rails_helper'

RSpec.describe User, type: :model do
  context '.has_completed_profile?' do
    context 'completed' do
      let(:user){build(:user)}
      
      it 'returns true' do
        expect(user.has_completed_profile?).to be_truthy
      end
    end

    context 'incomplete' do
      let(:user){build(:user, :without_infos)}
      
      it 'returns false' do
        expect(user.has_completed_profile?).to be_falsey
      end
    end
  end

  context '.from_omniauth' do
    let(:auth) {double('auth', info: double('info', email: email, first_name: first_name, last_name: last_name), provider: provider, uid: uid)}
    let(:authorization) {build(:authorization)}
    let(:authorization_relation) {double(ActiveRecord::Relation)}
    let(:email) {'azicat@fungo.ca'}
    let(:first_name) {'Alexandre'}
    let(:last_name) {'Zicat'}
    let(:provider) {'facebook'}
    let(:uid) {'12345'}
    let(:user) {create(:user, id: user_id)}
    let(:user_id) {9999}

    before(:each) {
      expect(Authorization).to receive(:where).with({provider: provider, uid: uid}).and_return(authorization_relation)
    }

    before(:each, :new_authorization) {
      expect(authorization_relation).to receive(:first_or_initialize).and_return(authorization)
    }

    context 'first time authorization for new user', :new_authorization do
      it 'creates the user and its authorization' do
        expect(User).to receive(:where).with('email = ?', email).and_return([])
        expect(User).to receive(:new).with(email: email, first_name: first_name, last_name: last_name, password: an_instance_of(String)).and_return(user)

        expect(User.from_omniauth(auth)).to eq(user)
      end
    end

    context 'first time authorization for existing user', :new_authorization do
      it 'adds the authorization to the user' do
        expect(User).to receive(:where).with('email = ?', email).and_return([user])
        expect(User).not_to receive(:new)
        expect(user).not_to receive(:skip_confirmation!)
        expect(user).not_to receive(:save!)

        expect(User.from_omniauth(auth)).to eq(user)
      end
    end

    context 'existing authorization' do
      let(:authorization_with_user) {build(:authorization, user: user)}

      it 'returns the user' do
        expect(authorization_relation).to receive(:first_or_initialize).and_return(authorization_with_user)
        expect(user).not_to receive(:skip_confirmation!)
        expect(user).not_to receive(:save!)
        expect(authorization_with_user).not_to receive(:save!)

        expect(User.from_omniauth(auth)).to eq(user)
      end
    end
  end
end
