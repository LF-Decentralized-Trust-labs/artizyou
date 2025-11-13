class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_locale

  protected

  def after_sign_in_path_for(user)
    user.has_completed_profile? ? (stored_location_for(user) || creations_path) : new_profile_path
  end

  private

  def set_locale
    locale = params[:locale] || cookies[:locale]
    locale = %w(fr en).include?(locale) ? locale : 'en'

    I18n.locale = cookies[:locale] = locale
  end
end
