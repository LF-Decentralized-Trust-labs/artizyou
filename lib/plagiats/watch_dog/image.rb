require "google/cloud/vision"

module Plagiats
  module WatchDog
    class Image
      def self.detect(image_path)
        begin
          vision = Google::Cloud::Vision.new(
              project_id: ENV['GOOGLE_CLOUD_PROJECT_ID'] || "artizyoutest",
              credentials: "#{Rails.root}/#{ENV['GOOGLE_CLOUD_KEYFILE_PATH'] || 'config/keys/keyfile.json'}"
          )
          image = vision.image image_path
          web = image.web
          full_match = web.full_matching_images
          partial_match = web.partial_matching_images

          return full_match + partial_match
        rescue Exception => e
          Rails.logger.error("Monitoring::Image Google Vision Post Request Failure")
          Rails.logger.error(DateTime.now)
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace)
        end
      end
    end
  end
end