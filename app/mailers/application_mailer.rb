class ApplicationMailer < ActionMailer::Base
  default from: ENV['EMAIL_FROM']
  layout 'mailer'

  def new_creation_notification()
    @creation = params[:creation]
    @user = params[:user]

    if @user.language === 'fr'
      I18n.locale = :fr
    else
      I18n.locale = :en
    end

    mail(to: @user.email, subject: t('mailer.new_creation.mail_object'))
  end

  def new_creation_with_promo_notification
    @creation = params[:creation]
    @user = params[:user]

    if @user.language === 'fr'
      I18n.locale = :fr
    else
      I18n.locale = :en
    end
    mail(to: @user.email, subject: t('mailer.new_creation.mail_object_with_promo'))
  end

end
