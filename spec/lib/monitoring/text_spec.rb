require 'rails_helper'
require 'monitoring/text'

RSpec.describe Monitoring::Text, type: :lib do
  subject {Monitoring::Text}
  let(:vizion) {double('vizion')}
  let(:image) {double('image')}
  let(:web) {double('web')}
  let(:full_matching_images_empty) {[]}
  let(:partial_matching_images_empty) {[]}
  let(:radioego_image_double) {double(url: "https://radioego.com/", score: 0.0)}
  let(:full_matching_images) {[radioego_image_double]}
  let(:radioego_partial_image_double) {double(url: "https://radioego.com/partial", score: 0.0)}
  let(:partial_matching_images) {[radioego_partial_image_double]}
  let(:document_file) {File.open("#{Rails.root}/public/robots.txt}", 'rb')}


  context '.monitor' do
    it 'document upload' do
      expect(RestClient).to receive(:post).with("#{ENV['PLAGSCAN_SERVER_URL']}/v3/token",
                                                {"client_id": "#{ENV['PLAGSCAN_CLIENT_ID']}", "client_secret": "#{ENV['PLAGSCAN_CLIENT_SECRET']}"}.to_json,
                                                {content_type: :json, accept: :json}).and_return({"access_token": "f654ae20de156264e9317802c432ea10ee8bb536",
                                                                                                  "expires_in": 3600,
                                                                                                  "token_type": "Bearer",
                                                                                                  "scope": nil
                                                                                                 }.to_json)
      expect(RestClient).to receive(:post).with("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents?access_token=f654ae20de156264e9317802c432ea10ee8bb536",
                                                {:multipart => true, fileUpload: @document_file}).and_return({"data": {"docID": 118056836},
                                                                                                  "location": "https://api.plagscan.com/v3/documents/118056836"}.to_json)

      expect(subject).to receive(:document_file).and_return(@document_file)
      #expect(subject.monitor({document_file_name: "robots.txt", document: {url:"#{Rails.root}/public/robots.txt"}})).to eq({"docID" => 118056836})
    end
  end
end