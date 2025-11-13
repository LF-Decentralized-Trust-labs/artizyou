require 'rails_helper'
require 'monitoring/watch_dog'

RSpec.describe Monitoring::WatchDog, type: :lib do
  subject {Monitoring::WatchDog}

  let(:vizion) {double('vizion')}
  let(:plagiats) {double('plagiats')}
  let(:plagiats_to_delete) {double('plagiats_association')}
  let(:creation) {double(:creation, user: double(:user), plagiats: plagiats, image: double(url: nil), document: double(url: nil))}
  let(:plagiat) {double(:plagiat, creation: creation)}

  context '.watch' do
    it 'watch text - no match' do
      creations = [creation]
      expect(Creation).to receive(:texts_to_upload).and_return(creations)
      expect(Monitoring::Text).to receive(:monitor).and_return([])
      expect(subject.watch).to eq(true)
    end

    it 'watch text - matches' do
      creations = [creation]
      expect(Creation).to receive(:texts_to_upload).and_return(creations)

      expect(Monitoring::Text).to receive(:monitor).and_return({"docID" => "118057174"})
      expect(creation).to receive(:scanned_document_id=).with("118057174")
      expect(creation).to receive(:save!).and_return(true)

      expect(subject.watch).to eq(true)
    end


    it 'watch image - no match' do
      creations = [creation]
      expect(Creation).to receive(:images).and_return(creations)
      expect(plagiats).to receive(:where).with(excluded: [false, nil]) { plagiats }
      expect(plagiats).to receive(:destroy_all)
      expect(Monitoring::Image).to receive(:monitor).and_return([])
      expect(subject.watch).to eq(true)
    end
    it 'watch image - matches' do
      creations = [creation]
      expect(Creation).to receive(:images).and_return(creations)

      expect(creation).to receive(:plagiats) { plagiats }
      expect(plagiats).to receive(:where).with(excluded: [false, nil]) { plagiats }
      expect(plagiats).to receive(:destroy_all)

      vision_double = double(url: 'http://google.com', score: '1')
      expect(Monitoring::Image).to receive(:monitor).and_return([vision_double])

      excluded_plagiats = double('excluded_plagiats')
      expect(plagiats).to receive(:where).with(url: vision_double.url, excluded: true) { excluded_plagiats }
      expect(excluded_plagiats).to receive(:empty?) { true }

      expect(plagiats).to receive(:build).with(url: vision_double.url, score: vision_double.score)

      expect(subject.watch).to eq(true)
    end
    it 'watch image - matches with excluded' do
      creations = [creation]
      expect(Creation).to receive(:images).and_return(creations)

      expect(creation).to receive(:plagiats) { plagiats }
      expect(plagiats).to receive(:where).with(excluded: [false, nil]) { plagiats }
      expect(plagiats).to receive(:destroy_all)

      vision_double = double(url: 'http://google.com', score: '1')
      expect(Monitoring::Image).to receive(:monitor).and_return([vision_double])

      excluded_plagiats = double('excluded_plagiats')
      expect(plagiats).to receive(:where).with(url: vision_double.url, excluded: true) { excluded_plagiats }
      expect(excluded_plagiats).to receive(:empty?) { false }

      expect(plagiats).not_to receive(:build)

      expect(subject.watch).to eq(true)
    end
  end
end