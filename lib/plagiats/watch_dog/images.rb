require 'plagiats/watch_dog/image'

module Plagiats
  module WatchDog
    class Images
      def self.watch
        ::Creation.images.each do |creation|
          begin
            creation.plagiats.where(excluded: [false, nil]).destroy_all

            match_list = WatchDog::Image.detect("#{creation.image.expiring_url(600)}")

            match_list.each do |ml|
              if creation.plagiats.where(url: ml.url, excluded: true).empty?
                creation.plagiats.build({url: ml.url, score: ml.score})

              end
              creation.save!

            end

            if match_list.present?
              send_notification_email(creation.user)
            end
          rescue Exception => e
            Rails.logger.error("WatchDog Monitoring::Image.monitor Failure")
            Rails.logger.error(DateTime.now)
            Rails.logger.error(e.message)
            Rails.logger.error(e.backtrace)
          end

        end

        return true
      end

      def self.send_notification_email(user)
        notification_email = PlagiatMailer.with(user: user).new_plagiat_notification
        notification_email.deliver_now
      end
    end
  end
end
