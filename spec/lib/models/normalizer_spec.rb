require 'rails_helper'
require 'models/normalizer'
require 'creations/serializer'

RSpec.describe Models::Normalizer, type: :lib do
  subject {Models::Normalizer}

  context '.normalize' do
    let(:creation1) {build(:creation, id: 1)}
    let(:creation2) {build(:creation, id: 2, year: 2017)}
    let(:normalized_creations) {{data: {1 => serialized_creation1, 2 => serialized_creation2}}}
    let(:normalized_creations_with_key) {{data: {2018 => serialized_creation1, 2017 => serialized_creation2}}}
    let(:serialized_creation1) {Creations::Serializer.serialize(creation1)}
    let(:serialized_creation2) {Creations::Serializer.serialize(creation2)}

    context 'with a block' do
      let(:block) {Proc.new {|creation| Creations::Serializer.serialize(creation)}}
      let(:normalized_creations) {{data: {1 => serialized_creation1, 2 => serialized_creation2}}}
      let(:normalized_creations_with_key) {{data: {2018 => serialized_creation1, 2017 => serialized_creation2}}}
      
      context 'without a key' do
        it 'normalizes the model' do
          expect(subject.normalize([creation1, creation2], &block)).to eq(normalized_creations)
        end
      end

      context 'with a key' do
        it 'normalizes the model' do
          expect(subject.normalize([creation1, creation2], :year, &block)).to eq(normalized_creations_with_key)
        end
      end
    end

    context 'without a block' do
      let(:camelized_creation1) {creation1.attributes.camelize_keys}
      let(:camelized_creation2) {creation2.attributes.camelize_keys}
      let(:normalized_creations) {{data: {1 => camelized_creation1, 2 => camelized_creation2}}}
      let(:normalized_creations_with_key) {{data: {2018 => camelized_creation1, 2017 => camelized_creation2}}}

      context 'without a key' do
        it 'normalizes the model' do
          expect(subject.normalize([creation1, creation2])).to eq(normalized_creations)
        end
      end

      context 'with a key' do
        it 'normalizes the model' do
          expect(subject.normalize([creation1, creation2], :year)).to eq(normalized_creations_with_key)
        end
      end
    end
  end
end