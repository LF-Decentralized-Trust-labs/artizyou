require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Artizyou
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.1

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Don't generate system test files.
    config.generators.system_tests = nil

    config.time_zone = 'Eastern Time (US & Canada)'
    config.active_record.default_timezone = :local
    config.i18n.default_locale = :en

    config.to_prepare do
      Devise::SessionsController.layout('devise')
      Devise::RegistrationsController.layout('devise')
      Devise::ConfirmationsController.layout('devise')
      Devise::UnlocksController.layout('devise')
      Devise::PasswordsController.layout('devise')

      Devise::Mailer.layout('mailer')
    end

    # Do not dump schema after migrations.
    config.active_record.dump_schema_after_migration = false

    if Rails.env.production? || Rails.env.staging?
      config.action_mailer.smtp_settings = {
          :address              => ENV['SMTP_ADDRESS'] || "email-smtp.us-east-1.amazonaws.com",
          :port                 => ENV['SMTP_PORT'] || 587,
          :user_name            => ENV['SMTP_USERNAME'],
          :password             => ENV['SMTP_PASSWORD'],
          :authentication       => "plain",
          :enable_starttls_auto => true,
          domain: ENV['SMTP_DOMAIN'] || "artizyou.com"
      }

      exception_notification_config = {}
      
      if ENV['SLACK_WEBHOOK_URL'].present?
        exception_notification_config[:slack] = {
          webhook_url: ENV['SLACK_WEBHOOK_URL'],
          channel: ENV['SLACK_CHANNEL'] || "#{Rails.env}-errors",
          username: ENV['SLACK_USERNAME'] || "artizyou",
          additional_parameters: {mrkdwn: true}
        }
      end

      if ENV['EXCEPTION_NOTIFICATION_EMAIL'].present?
        exception_notification_config[:email] = {
          email_prefix: "[#{'STAGING-' unless Rails.env.production?}ERROR]",
          sender_address: %{"ARTIZYOU notifier" <#{ENV['EXCEPTION_NOTIFICATION_SENDER'] || ENV['EMAIL_FROM'] || 'contact@artizyou.com'}>},
          exception_recipients: ENV['EXCEPTION_NOTIFICATION_EMAIL'].split(',')
        }
      end

      if exception_notification_config.any?
        config.middleware.use ExceptionNotification::Rack, exception_notification_config
      end

      # config.middleware.use ExceptionNotifier::Rake.configure(
      #     :email => {
      #         :email_prefix => "[Rake Failure] ",
      #         sender_address: %{"ARTIZYOU notifier" <artizyou@fungo.ca>},
      #         :exception_recipients => %w{artizyou@fungo.ca}})
    end

    unless Rails.env.test?
      config.paperclip_defaults = {
          s3_protocol: :https,
          storage: :s3,
          s3_credentials: {
              bucket: "#{ENV['AWS_BUCKET']}#{'-staging' unless Rails.env.production?}",
              access_key_id: ENV['AWS_ACCESS_KEY_ID'],
              secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
              s3_region: ENV['AWS_REGION']
          },
          s3_permissions: :private
      }
    end
  end
end
