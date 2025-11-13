class PlansController < ApplicationController
  def show
    # note to self: add security to this header
    headers['Access-Control-Allow-Origin'] = '*'
    @plan = Plan.find_by_code(params[:code])

    if @plan == nil || @plan.code == 'DEFAULT'
      render json: {status: 'invalid'}

    elsif @plan.is_expired?
      render json: {
          status: 'expired',
          influencer: @plan.influencer_name,
          expirationDate: @plan.expiration_date
      }

    else
      render json: {
          status: 'valid',
          code: @plan.code,
          amount: @plan.amount,
          currency: @plan.currency,
          influencer: @plan.influencer_name,
          certificates: @plan.registered_creation_limit,
          discount: calculate_discount(@plan.amount, @plan.registered_creation_limit),
          expirationDate: show_expiration_date,
          pricePerUnit: @plan.amount / @plan.registered_creation_limit
      }
    end
  end

  def show_expiration_date
    if @plan.expiration_date
      @plan.expiration_date.strftime('%b %d %Y')
    else
      false
    end
  end

  def calculate_discount(amount, number_of_certificates)
    default_plan = Plan.find_by_code('DEFAULT')
    full_price = default_plan.amount * number_of_certificates
    100 - ((amount * 100) / full_price).round
  end


end