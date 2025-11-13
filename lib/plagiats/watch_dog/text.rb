require 'open-uri'
require "google/cloud/vision"

module Plagiats
  module WatchDog
    class Text
      def self.detect(creation)

        begin
          RestClient.log = 'stdout'
          puts "---- get PLAGSCAN ACCESS TOKEN ----"
          response = RestClient.post("#{ENV['PLAGSCAN_SERVER_URL']}/v3/token",
                                     {
                                         "client_id": "#{ENV['PLAGSCAN_CLIENT_ID']}",
                                         "client_secret": "#{ENV['PLAGSCAN_CLIENT_SECRET']}"
                                     }.to_json,
                                     {content_type: :json, accept: :json})
          res = JSON.parse(response)

          puts "---- push PLAGSCAN FILE ----"
          response = RestClient.post("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents?access_token=#{res['access_token']}", {textdata: creation.text_extract})
          res = JSON.parse(response)

          return res["data"]

        rescue Exception => e
          Rails.logger.error("Monitoring::Text Access Token or Plagscan Post Request Failure")
          Rails.logger.error(DateTime.now)
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace)
        end

      end

      def self.test(creation = Creation.find(440))

        begin
          RestClient.log = 'stdout'
          puts "---- get PLAGSCAN ACCESS TOKEN ----"
          response = RestClient.post("#{ENV['PLAGSCAN_SERVER_URL']}/v3/token",
                                     {
                                         "client_id": "#{ENV['PLAGSCAN_CLIENT_ID']}",
                                         "client_secret": "#{ENV['PLAGSCAN_CLIENT_SECRET']}"
                                     }.to_json,
                                     {content_type: :json, accept: :json})
          res = JSON.parse(response)
          pp res


          doc_id = 128412271
          data_response = JSON.parse(RestClient.get("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents/#{doc_id}/retrieve?access_token=#{res['access_token']}&mode=2"))
          raw_data = Nokogiri::XML(data_response['data']['reportData'])
          response = RestClient.get("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents/#{doc_id}/retrieve?access_token=#{res['access_token']}&mode=4")
          doc = Nokogiri::HTML(response)
          user_text = doc.css('#maintext2')
          score = doc.css('.indicator').text[/\d+.\d+/].to_f
          whole_text = []
          sources = raw_data.xpath('//numberSources').text.to_i
          detections = raw_data.xpath('//numberSources').attribute('data').value.to_i

          user_text.children.each do |children|

            text = children.text.gsub(/\r\n/, '')
            text = text.gsub(/={18,}\d+\/\d+={18,}/, '')
            if children.attributes.size > 0
              whole_text.push({text: text, links: children.attribute('onmouseover').value.scan(/(http[^\\]*?)</)})
            else
              whole_text.push({text: text})
            end
          end

          #removing the -------------------1/1-------------
          whole_text[0][:text].gsub!(/[\n]=+\d+\/\d+=+/, '')

          creation.plagiats.build(score: score, annotated_text: whole_text.to_json, detections: detections, sources: sources)
          creation.save
          creation.update(scanned_document_id: nil, last_scanned_doc_id: doc_id)

          return whole_text

        rescue Exception => e
          Rails.logger.error("Monitoring::Text Access Token or Plagscan Post Request Failure")
          Rails.logger.error(DateTime.now)
          Rails.logger.error(e.message)
          Rails.logger.error(e.backtrace)
        end

      end

      def self.document_file(creation)
        doc = open("/tmp/#{creation.document_file_name}", 'wb') do |file|
          file << open(creation.document.expiring_url(30)).read
        end

        doc = File.new("/tmp/#{creation.document_file_name}", 'rb')
        pp doc
        doc
      end
    end
  end
end
