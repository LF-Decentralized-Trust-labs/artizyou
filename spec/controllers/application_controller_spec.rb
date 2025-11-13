require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  context '.after_sign_in_path_for' do
    context 'with a completed profile' do
      let(:user) {build(:user)}

      it 'returns the creations path' do
        expect(subject.send(:after_sign_in_path_for, user)).to eq(creations_path)
      end
    end

    context 'with a completed profile' do
      let(:user) {build(:user, :without_infos)}

      it 'returns the creations path' do
        expect(subject.send(:after_sign_in_path_for, user)).to eq(new_profile_path)
      end
    end
  end
end