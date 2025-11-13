require 'payment/stripe'

class StripeService
  class StripeException < StandardError
  end

  attr_reader :user

  def initialize(user, card = nil)
    @user = user
    @card = card
  end

  def create_payment_intent(amount, currency)
    parameters = {
      amount: (amount.to_f * 100).to_i,
      currency: currency || 'usd',
      payment_method_types: ['card'],
      customer: user.customer_id,
    }
    parameters = parameters.merge(payment_method: @card) if @card
    Stripe::PaymentIntent.create(parameters)
  end

  def add_card(token_id, email, name, last_four_digit = nil)
    card = user.cards.find_by(last_four_digit: last_four_digit)
    return card if card.present?

    create_customer(email, name) unless @user.customer_id.present?
    stripe_card = Stripe::Customer.create_source(customer.id, { source: token_id })
    user.cards.create!(card_params(stripe_card))
  end

  def card_params(card)
    {
      card_id: card["id"],
      brand: card["brand"],
      country: card["country"],
      customer_id: card["customer"],
      exp_month: card["exp_month"],
      exp_year: card["exp_year"],
      fingerprint: ["fingerprint"],
      name: card["name"],
      last_four_digit: card["last4"]
    }
  end

  def credit_card_info(token_id, card_id)
    Stripe::Customer.retrieve_source(token_id, card_id,)
  end

  def update_credit_card(token_id, name)
    card = Stripe::Customer.update_source(token_id, card_id, { name: name })
    card_id = card.id
    customer.default_source = card_id
    customer.save
    user.update!(card_id: card_id)
  end

  def customer
    customer_id = @user.customer_id
    return unless customer_id.present?

    @customer ||= Stripe::Customer.retrieve(customer_id)
  end

  private

  def create_customer(email, name)
    customer_params = {
      email: email,
      description: "#{user.username} #{name}"
    }
    @customer = Stripe::Customer.create(customer_params)
    @user.update!(customer_id: @customer.id)
  end
end
