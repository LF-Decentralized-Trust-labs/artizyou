module Payment
  class Stripe

    def self.charge(token, currency, description, amount, customer_id)
      to_pay = (amount.to_f.round(2) * 100).to_i
      charge = ::Stripe::Charge.create(
          amount: to_pay,
          currency: currency,
          description: description,
          source: token,
          customer: customer_id,
          )

      [200, 'success', charge['id']]
    rescue ::Stripe::CardError => error
      [400, "stripe.errors.#{error.code}"]
    end
  end
end
