require 'rails_helper'
require 'payment/stripe'

RSpec.describe Payment::Stripe, type: :lib do
  subject {Payment::Stripe}

  context '.charge' do
    let(:charge_id) {'ch_oih342nlk'}
    let(:creation) {build(:creation, user_id: user.id)}
    let(:token) {'token'}
    let(:user) {create(:user)}
    let(:stripe_payload) {{amount: Constants::Payment::AMOUNT, currency: 'CAD', description: "user: #{user.id}, creation: #{creation.id}", source: token}}

    context 'valid payload' do
      it 'charges the user for the creation registration' do
        expect(Stripe::Charge).to receive(:create).with(stripe_payload).and_return({'id' => charge_id})
        expect(creation).to receive(:charge_id=).with(charge_id)
        expect(creation).to receive(:save!)

        expect(subject.charge(creation, token)).to eq([200, 'success'])
      end
    end

    context 'invalid payload' do
      let(:error_code) {'error_code'}

      it 'raises an error' do
        expect(Stripe::Charge).to receive(:create).with(stripe_payload).and_raise(Stripe::CardError.new('message', {}, error_code))
        expect(subject.charge(creation, token)).to eq([400, "stripe.errors.#{error_code}"])
      end
    end
  end
end