require 'rails_helper'

RSpec.describe ReactHelper, type: :helper do
  context '.react_universal_component_tags' do
    context 'with scripts' do
      it 'returns the js tags' do
        @sea_otter_exports = {'scripts' => ['test.js']}
        
        expect(react_universal_component_tags).to eq("<script src='/test.js'></script>".html_safe)
      end
    end

    context 'without scripts' do
      it 'returns a blank string' do
        @sea_otter_exports = {'scripts' => []}

        expect(react_universal_component_tags).to eq('')
      end
    end

    context 'without exports' do
      it 'a blank string' do
        @sea_otter_exports = nil

        expect(react_universal_component_tags).to eq('')
      end
    end
  end

  context '.styled_components_tags' do
    context 'with styles' do
      it 'returns the style tags' do
        @sea_otter_exports = {'styles' => '<style/>'}

        expect(styled_components_tags).to eq('<style/>'.html_safe)
      end
    end

    context 'with blank style' do
      it 'returns a blank string' do
        @sea_otter_exports = {'styles' => ''}

        expect(styled_components_tags).to eq('')
      end
    end

    context 'without styles' do
      it 'returns a blank string' do
        @sea_otter_exports = {'styles' => nil}

        expect(styled_components_tags).to eq(nil)
      end
    end

    context 'without exports' do
      it 'returns a blank string' do
        @sea_otter_exports = nil

        expect(styled_components_tags).to eq(nil)
      end
    end
  end
end