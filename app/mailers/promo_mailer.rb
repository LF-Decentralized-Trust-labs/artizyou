class PromoMailer < ApplicationMailer
  def new_promo_notification
    @user = params[:user]
    I18n.locale = :en

    mail(to: @user.email, subject: t('mailer.new_promo.mail_object', promo: @user.user_plan.plan.code))
  end
end
