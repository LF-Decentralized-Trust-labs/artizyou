class BlockchainMailer < ApplicationMailer
  def error
    @creation = params[:creation]
    @error = params[:error]
    @user = params[:user]

    mail(
        to: ENV['BLOCKCHAIN_ERROR_EMAIL_TO'] || ENV['EXCEPTION_NOTIFICATION_EMAIL'] || 'artizyou@fungo.ca',
        cc: ENV['BLOCKCHAIN_ERROR_EMAIL_CC'] || ENV['EMAIL_FROM'] || 'contact@artizyou.com',
        subject: "#{"[#{Rails.env}] - " unless Rails.env.production?}enregistrement d'une création dans blockchain - erreur"
    )
  end
end
