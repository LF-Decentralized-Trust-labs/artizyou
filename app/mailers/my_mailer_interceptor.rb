class MyMailerInterceptor
  def self.delivering_email(message)
    message.to = ENV['DEV_MAIL_TO'] ? ENV['DEV_MAIL_TO'].split(',') : ['artizyou@fungo.ca']
    Rails.logger.info("from email interceptor - message.to=#{message.to}")
    message.bcc = []
    message.cc = []
    message.subject = "ARTIZYOU TEST (ne pas considérer) - #{message.subject}"
  end
end