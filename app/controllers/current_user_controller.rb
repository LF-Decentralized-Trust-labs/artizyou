class CurrentUserController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token

  def pay
    payment_resource = current_user.user_plan
    amount = (payment_resource && payment_resource.plan ? payment_resource.total : nil) || Constants::Payment::AMOUNT
    payment_description = "user: #{current_user.id}, plan: #{payment_resource.plan.code}"
    payment_terms = DateTime.now
    payment_resource.paid_without_taxes = payment_resource.plan.amount
    payment_resource.taxes = payment_resource.taxes
    payment_resource.payment_terms = payment_terms
    payment_resource.encryption_terms = payment_terms
    payment_resource.automatic_payment_terms = payment_terms
    payment_resource.payment_date = payment_terms
    payment_resource.order_number = payment_resource.generate_order_number
    payment_resource.charge_id = params[:payment_intent_id]
    payment_resource.paid = amount
    payment_resource.save!
    send_notification_email

    render json: { msgCode: 'success', status: 200, chargeId: params[:payment_intent_id], paymentTerms: payment_terms }
  end

  def send_notification_email
    notification_email = PromoMailer.with(user: current_user).new_promo_notification
    notification_email.deliver_now
  end
end
