RSpec.shared_examples 'unauthenticated' do |klass|
  after(:each) {
    expect(response.status).to redirect_to(new_user_session_path)
  }
end