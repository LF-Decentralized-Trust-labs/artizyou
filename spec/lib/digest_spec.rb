require 'rails_helper'
require 'digest'

RSpec.describe 'digest' do
  it 'hash' do
    f = File.open("#{Rails.root}/spec/fixtures/test-image.png")
    expect(Digest::SHA256.base64digest(f.read)).to eq Digest::SHA256.file("#{Rails.root}/spec/fixtures/test-image.png").base64digest
  end
end