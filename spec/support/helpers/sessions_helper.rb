module SessionsHelper
  def sign_user_in(user = create(:user))
    visit '/'

    fill_in('Email', with: user.email)
    fill_in('Password', with: user.password)

    click_button('Log in')
  end

  def request_user_sign_in(user)
    Warden.test_mode!
    login_as(user)
  end

  def controller_user_sign_in(user)
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    allow(controller).to receive(:current_user).and_return(user)
  end
end