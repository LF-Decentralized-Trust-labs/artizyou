require 'plagiats/watch_dog/text'

module Plagiats
  module WatchDog
    class Texts
      def self.watch

        ::Creation.texts_to_upload.each do |creation|
          creation.plagiats.where(excluded: [false, nil]).destroy_all

          begin
            loaded_document = WatchDog::Text.detect(creation)

            unless loaded_document.empty?
              creation.scanned_document_id = "#{loaded_document['docID']}"
              creation.save!
            end
          rescue Exception => e
            Rails.logger.error("WatchDog Monitoring::Text.monitor Failure")
            Rails.logger.error(DateTime.now)
            Rails.logger.error(e.message)
            Rails.logger.error(e.backtrace)
          end
        end

        return true
      end
    end
  end
end