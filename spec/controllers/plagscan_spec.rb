require 'rails_helper'

RSpec.describe PlagscansController, type: :controller do
  it 'should process xml' do
    Creation.create!(scanned_document_id: 2342342342,
                     user: User.new,
                     creation_type: CreationType.new)
    data = {
        'access_token': 'patate'
    }
    expect(RestClient).to receive(:post).with("#{ENV['PLAGSCAN_SERVER_URL']}/v3/token",
                                              {
                                                  "client_id": "#{ENV['PLAGSCAN_CLIENT_ID']}",
                                                  "client_secret": "#{ENV['PLAGSCAN_CLIENT_SECRET']}"
                                              }.to_json,
                                              {content_type: :json, accept: :json}) {data.to_json}

    file = File.open("#{Rails.root}/testxml.xml")
    plagscan_document = file.read

    post_param = "#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents/2342342342/retrieve?access_token=#{data[:access_token]}&mode=2"
    expect(RestClient).to receive(:get).with(post_param) {{data: {reportData: plagscan_document}}.to_json}

    get :show, params: {"2342342342": nil}

    expect(Plagiat.all.size).to eq 8
    expect(Plagiat.first.url).to eq "https://www.plagscan.com/view?127531496"
    expect(Plagiat.first.snippet).to eq "Ma vie est un long chemin sans fin Et je ne sais pas très bien où j'm'en vais Je cherche dans les
        faubourgs et les villes C'est dans l'espoir d'accomplir mon destin Mille après mille je suis triste Mille après
        mille je m'ennuie Jour après jour sur la route Tu n'peux pas savoir comme j'peux t'aimer ((. . .))"
    expect(response.status).to be(200)
  end
end
