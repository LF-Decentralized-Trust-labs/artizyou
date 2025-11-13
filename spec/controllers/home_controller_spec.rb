require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  context '#index' do
    context 'authenticated' do
      let(:user) {create(:user)}

      before(:each) {
        controller_user_sign_in(user)
        # expect(controller).to receive(:current_user).at_least(1).times.and_return(user)
      }

      it 'mounts the react app' do
        get :index

        expect(response.status).to be(200)
        expect(assigns(:props)[:location]).to eq('/creations')
        expect(assigns(:props)[:redux][:user]).to eq(Users::Serializer.serialize(user))
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        get :index
      end
    end
  end
end