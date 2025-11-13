require 'rails_helper'
require 'creations/serializer'

RSpec.describe Creations::Serializer, type: :lib do
  subject {Creations::Serializer}

  context '.serialize' do
    let(:categories) {create_list(:category, 3)}
    let(:creation) {build(:creation, :image, id: id, categories: categories)}
    let(:file_name) {'/system/creations/images/000/000/001/original/file.jpg'}
    let(:id) {1}
    let(:serialized_creation) {
      {
          acceptedTerms: nil,
          author: nil,
          chargeId: nil,
          creationTypeId: 999,
          contractAddress: nil,
          description: 'creation description',
          firstMarketUse: nil,
          kind: 'image',
          name: 'creation name',
          operatingTerritories: [],
          owner: nil,
          textExtract: nil,
          txHash: nil,
          year: 2018,
          creationId: id,
          categories: categories.map(&:id),
          plagiatCount: creation.plagiats.last.sources,
          image: file_name
      }
    }


    it 'serializes the creation' do
      expect(subject.serialize(creation)).to eq(serialized_creation)
    end
  end
end