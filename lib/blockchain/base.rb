require 'digest'

module Blockchain
  class Base
    class << self

      def hash(data)
        Digest::SHA256.base64digest(data)
      end

      def hash_file(file_path)
        Digest::SHA256.file(file_path).base64digest
      end

      def register(fingerprint, creation_id)
        response = RestClient.post("#{ENV['BLOCKCHAIN_SERVER_URL']}/register/#{creation_id}",
                                   {fingerprint: fingerprint}.to_json,
                                   {'APP-ID' => 'ARTIZYOU', content_type: :json, accept: :json}
        )

        JSON.parse(response)['txHash']
      end
    end
  end
end