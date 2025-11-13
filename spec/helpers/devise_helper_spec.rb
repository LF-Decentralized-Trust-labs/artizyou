require 'rails_helper'
# require 'active_model/errors'

RSpec.describe DeviseHelper, type: :helper do
  context '.react_universal_component_tags' do
    context 'with errors' do
      let(:resource) {double('resource', errors: [])}
      
      it 'returns an empty string' do
        expect(devise_error_messages!).to eq('')
      end
    end

    context 'no error messages' do
      let(:error_message) {'error'}
      let(:errors) {ActiveModel::Errors.new(self)}
      let(:resource) {double('resource', errors: errors)}

      it 'returns an empty string' do
        resource.errors.add(:base, error_message)

        html = <<-HTML.strip
      <div class="alert alert-danger" id="error_explanation">
        <ul><li>#{error_message}</li></ul>
      </div>
        HTML

        expect(devise_error_messages!).to eq(html)
      end
    end
  end
end