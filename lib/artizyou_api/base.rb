require "rest-client"

module ArtizyouAPI
  class Base
    class << self
      def register(creationID, custody)
        reqBody = { creationID: creationID, custody: custody }
        response = RestClient.post "#{ENV['ARTIZYOU_API_URL']}/creations/register", reqBody, { token: ENV["ARTIZYOU_API_TOKEN"] }
        response.code
      end

      def checkCustody(creationID)
        response = RestClient.get "#{ENV['ARTIZYOU_API_URL']}/NFC/custody/#{creationID}", { token: ENV["ARTIZYOU_API_TOKEN"] }
        return response.code
      end

      def plagiarismChecker(creationID)
        response = RestClient.post "#{ENV['ARTIZYOU_API_URL']}/plagiats/#{creationID}", {}, { token: ENV["ARTIZYOU_API_TOKEN"] }
        return response.code
      end
    end
  end
end
