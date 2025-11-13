class ConfirmationsController < Devise::ConfirmationsController
  protected

  # The path used after confirmation.
  def after_confirmation_path_for(resource_name, resource)
    if signed_in?(resource_name)
      signed_in_root_path(resource)
    else
      params = {}
      params[:user_plan] = true if !resource.user_plan.default?
      new_session_path(resource_name, params)
    end
  end
end

