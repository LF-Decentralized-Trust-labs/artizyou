require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  let(:user) {create(:user)}

  before(:each, :authenticated) {
    controller_user_sign_in(user)
  }

  context '#update' do
    let(:id) {'1'}
    let(:params) {{user: {first_name: 'Alex', last_name: 'zicat'}}}
    let(:strong_params) {ActionController::Parameters.new(params).require(:user).permit(:first_name, :last_name)}

    before(:each, :authenticated) {
      expect(controller).to receive(:current_user).at_least(1).times.and_return(user)
    }

    context 'valid payload', :authenticated do

      it 'updates the user' do
        expect(user).to receive(:update!).with(strong_params).and_return(true)

        put :update, params: {id: id, user: {first_name: 'Alex', last_name: 'zicat'}}

        expect(response.status).to be(200)
        expect(response.body).to eq(Users::Serializer.serialize(user).to_json)
      end
    end

    context 'invalid payload', :authenticated do
      it 'returns a 400 error' do
        expect(user).to receive(:update!).and_raise {Exception}

        put :update, params: {id: id, user: {first_name: 'Alex', last_name: 'zicat'}}

        expect(response.status).to be(400)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        put :update, params: {id: id, user: {first_name: 'Alex', last_name: 'zicat'}}
      end
    end
  end

  context '#verify_username' do
    let(:username) {'alexzicat'}

    context 'already existing', :authenticated do
      it 'returns true' do
        expect(User).to receive(:find_by_username).with(username).and_return(double(id: 2))

        post :verify_username, params: {username: username}

        expect(response.status).to be(200)
        expect(response.body).to eq({user_id: 2}.to_json)
      end
    end

    context 'not existing', :authenticated do
      it 'returns false' do
        expect(User).to receive(:find_by_username).with(username).and_return(nil)

        post :verify_username, params: {username: username}

        expect(response.status).to be(200)
        expect(response.body).to eq({user_id: nil}.to_json)
      end
    end

    context 'invalid payload', :authenticated do
      it 'returns a 400 error' do
        expect(User).to receive(:find_by_username).and_raise {Exception}

        post :verify_username, params: {username: username}

        expect(response.status).to be(400)
      end
    end

    context 'unauthenticated' do
      include_examples 'unauthenticated'

      it 'redirects to the sign in page' do
        put :verify_username, params: {username: username}
      end
    end
  end
end