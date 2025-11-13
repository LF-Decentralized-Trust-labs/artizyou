require 'rails_helper'
require 'monitoring/image'

RSpec.describe Monitoring::Image, type: :lib do
  subject {Monitoring::Image}
  let(:vizion) {double('vizion')}
  let(:image) {double('image')}
  let(:web) {double('web')}
  let(:full_matching_images_empty) {[]}
  let(:partial_matching_images_empty) {[]}
  let(:radioego_image_double) {double(url: "https://radioego.com/", score: 0.0)}
  let(:full_matching_images) {[radioego_image_double]}
  let(:radioego_partial_image_double) {double(url: "https://radioego.com/partial", score: 0.0)}
  let(:partial_matching_images) {[radioego_partial_image_double]}

  context '.monitor' do
    it 'no image match' do
      expect(Google::Cloud::Vision).to receive(:new).and_return(vizion)
      expect(vizion).to receive(:image).and_return(image)
      expect(image).to receive(:web).and_return(web)
      expect(web).to receive(:full_matching_images).and_return(full_matching_images_empty)
      expect(web).to receive(:partial_matching_images).and_return(partial_matching_images_empty)
      expect(subject.monitor("#{Rails.root}/public/logo.png")).to eq([])
    end
    it 'image match full and partial' do
      expect(Google::Cloud::Vision).to receive(:new).and_return(vizion)
      expect(vizion).to receive(:image).and_return(image)
      expect(image).to receive(:web).and_return(web)
      expect(web).to receive(:full_matching_images).and_return(full_matching_images)
      expect(web).to receive(:partial_matching_images).and_return(partial_matching_images)
      expect(subject.monitor("#{Rails.root}/public/logo.png")).to eq([radioego_image_double, radioego_partial_image_double])
    end
    it 'image match full empty and partial' do
      expect(Google::Cloud::Vision).to receive(:new).and_return(vizion)
      expect(vizion).to receive(:image).and_return(image)
      expect(image).to receive(:web).and_return(web)
      expect(web).to receive(:full_matching_images).and_return(full_matching_images_empty)
      expect(web).to receive(:partial_matching_images).and_return(partial_matching_images)
      expect(subject.monitor("#{Rails.root}/public/logo.png")).to eq([radioego_partial_image_double])
    end
    it 'image match full and partial empty' do
      expect(Google::Cloud::Vision).to receive(:new).and_return(vizion)
      expect(vizion).to receive(:image).and_return(image)
      expect(image).to receive(:web).and_return(web)
      expect(web).to receive(:full_matching_images).and_return(full_matching_images)
      expect(web).to receive(:partial_matching_images).and_return(partial_matching_images_empty)
      expect(subject.monitor("#{Rails.root}/public/logo.png")).to eq([radioego_image_double])
    end
  end
end