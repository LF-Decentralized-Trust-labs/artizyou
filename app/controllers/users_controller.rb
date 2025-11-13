require 'users/serializer'

class UsersController < ApplicationController

  before_action :authenticate_user!, only: [:update, :verify_username]
  protect_from_forgery with: :null_session, only: [:delete_data]

  def show
    render json: Users::Serializer.serialize(current_user)
  end

  def update
    current_user.assign_attributes(user_params)
    current_user.save

    render json: Users::Serializer.serialize(current_user)
  rescue Exception => e
    Rails.logger.error(e)
    head(:bad_request)
  end

  def delete_data
    head :ok
  end

  def verify_username
    u = User.find_by_username(params[:username])
    render json: {user_id: (u.id if u.present?) || nil}
  rescue
    head(:bad_request)
  end

  def create
  end

  private

  def user_params
    permitted_attributes = [:first_name, :last_name, :username, :language, :activity, :activity_precision, :ethereum_wallet_address,
                            :country, :city, :state, :description, :photo, :accepted_terms, :onboarding,
                            :facebook_url, :twitter_url, :linked_in_url, :personnal_website, :professional_website, :address]
    @user_params ||= params.require(:user).permit(permitted_attributes)
  end
end
