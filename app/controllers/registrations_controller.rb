class RegistrationsController < Devise::RegistrationsController
  before_action :before_login, :only => :create
  before_action :configure_permitted_parameters, only: [:create]

  def before_login
    if params[:user][:email]
      u = User.find_by_email(params[:user][:email])

      if u.present?
        auth = Authorization.find_by_user_id(u.id)

        if auth.present?
          set_flash_message(:alert, "errors.provider.#{auth.provider}") if auth.provider.present?
        end
      end
    end
  end

  def build_resource(hash = {})
    super(hash).tap do |u|
      if hash.empty?
        plan_code = session[:plan_code] = params[:code]
        if plan_code
          u.user_plans.build(plan: Plan.find_by_code(plan_code))
          I18n.locale = cookies[:locale] = 'en'
        end
      end
    end
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up) { |u| u.permit(:email, :password, :password_confirmation, user_plans_attributes: [:plan_id])}
  end

  def after_inactive_sign_up_path_for(resource)
    new_user_session_path
  end
end