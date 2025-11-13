class PlagiatMailer < ApplicationMailer
  def new_plagiat_notification
    @user = params[:user]
    @creation = params[:creation]

    pp@creation

    I18n.locale = :en

    mail(to: @user.email, subject: t('mailer.new_plagiat.mail_object'))
  end
end
