class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def facebook
    oauth2('Facebook')
  end

  def google_oauth2
    oauth2('Google')
  end

  def linkedin
    oauth2('LinkedIn')
  end

  def failure
    redirect_to(root_path)
  end

  private

  def oauth2(kind)
    auth = request.env['omniauth.auth']

    Rails.logger.info("plan code when callback = #{session[:plan_code]}")
    @user = User.from_omniauth(auth, session[:plan_code])

    if @user.persisted?
      sign_in_and_redirect(@user, event: :authentication) #this will throw if @user is not activated
      set_flash_message(:notice, :success, kind: kind) if is_navigational_format?
    else
      redirect_to(new_user_registration_url, alert: @user.errors.map {|key, value| value}.join("\n"))
    end
  end
end