require 'open-uri'
require 'nokogiri'
class PlagscansController < ApplicationController
  def show
    doc_id = params.keys.first
    
    if 'docID' == doc_id
      render json: {status: 204}
      return
    end

    creation = Creation.find_by(scanned_document_id: doc_id)

    unless creation.present?
      render json: {status: 204}
      return
    end

    #Sending document to Plagscan and waiting for response

    response = RestClient.post("#{ENV['PLAGSCAN_SERVER_URL']}/v3/token",
      {
        "client_id": "#{ENV['PLAGSCAN_CLIENT_ID']}",
        "client_secret": "#{ENV['PLAGSCAN_CLIENT_SECRET']}"
      }.to_json,
      {
        content_type: :json, accept: :json
      }
    )
    res = JSON.parse(response)

    #Receiving Plagscan's responses data_response is for raw data, response is for annotatedtext
    data_response = JSON.parse(RestClient.get("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents/#{doc_id}/retrieve?access_token=#{res['access_token']}&mode=2"))
    raw_data = Nokogiri::XML(data_response['data']['reportData'])
    response = RestClient.get("#{ENV['PLAGSCAN_SERVER_URL']}/v3/documents/#{doc_id}/retrieve?access_token=#{res['access_token']}&mode=4")
    doc = Nokogiri::HTML(response)
    user_text = doc.css('#maintext2')
    score = doc.css('.indicator').text[/\d+.\d+/].to_f
    whole_text = []
    sources = raw_data.xpath('//numberSources').text.to_i
    detections = raw_data.xpath('//result').length

    user_text.children.each do |children|

      text = children.text.gsub(/\r\n/, '')
      #removing the =============1/1==================  thing
      text = text.gsub(/={18,}\d+\/\d+={18,}/, '')
      if children.attributes.size > 0
        whole_text.push({text: text, links: children.attribute('onmouseover').value.scan(/(http[^\\]*?)</)})
      else
        whole_text.push({text: text})
      end
    end


    creation.plagiats.build(score: score, annotated_text: whole_text.to_json, detections: detections, sources: sources)
    creation.save
    creation.update(scanned_document_id: nil, last_scanned_doc_id: doc_id)
    send_notification_email(creation.user, creation)

  end

  def send_notification_email(user, creation)
    notification_email = PlagiatMailer.with(user: user, creation: creation).new_plagiat_notification
    notification_email.deliver_now
  end
end