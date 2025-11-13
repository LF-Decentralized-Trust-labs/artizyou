require 'rails_helper'
require 'digest'
require 'blockchain/base'

RSpec.describe Blockchain::Base, type: :lib do
  subject {Blockchain::Base}

  let(:data) {{key: 'value'}.to_json}

  context '.hash' do
    it 'hashes data as json' do
      expect(subject.hash(data)).to eq(Digest::SHA256.base64digest(data))
    end
  end

  context '.hash_file' do
    context 'existing file' do
      let(:file_path) {"#{Rails.root}/spec/fixtures/test-image.png"}

      it 'hashes the file' do
        expect(subject.hash_file(file_path)).to eq(Digest::SHA256.file(file_path).base64digest)
      end
    end

    context 'file not found' do
      let(:file_path) {'/wrong/path.png'}

      it 'raises an error' do
        expect{subject.hash_file(file_path)}.to raise_error(Errno::ENOENT)
      end
    end
  end

  context '.register' do
    let(:tx_hash) {'yhgh4983bjkdn'}

    it 'register the data to the blockchain' do
      expect(RestClient).to receive(:post).with("#{ENV['BLOCKCHAIN_SERVER_URL']}/register", {fingerprint: data}.to_json, {'APP-ID' => 'ARTIZYOU', content_type: :json, accept: :json}).and_return({txHash: tx_hash}.to_json)

      expect(subject.register(data)).to eq(tx_hash)
    end
  end
end