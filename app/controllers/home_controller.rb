require 'creations/serializer'
require 'creation_types/serializer'
require 'models/normalizer'
require 'users/serializer'

class HomeController < ApplicationController
  before_action :authenticate_user!, only: :index
  before_action :block_nav_incomplete_profile, only: :index
  before_action :init_props


  def index
    [:categories, :creations, :creation_types, :user, :activities, :languages].each do |redux_key|
      set_redux_prop(redux_key.to_s.camelize(:lower).to_sym, self.send("inject_#{redux_key}"))
    end
  end

  def show
    user = User.find_by!(username: params[:username])
    set_redux_prop(:user, inject_user(user, true))

    [:activities, :languages].each do |redux_key|
      set_redux_prop(redux_key.to_s.camelize(:lower).to_sym, self.send("inject_#{redux_key}"))
    end
  end

  private

  def block_nav_incomplete_profile
    if current_user.user_plan
      unless request.fullpath == pay_path || current_user.user_plan.default? || current_user.user_plan.paid
        redirect_to pay_path
        return
      end

      if request.fullpath == pay_path
        if current_user && current_user.user_plan.paid
          redirect_to root_path
        end
        return
      end
    end

    ## redirect to /profile/new if the profile is not completed
    if request.fullpath != new_profile_path && !current_user.has_completed_profile?
      redirect_to(new_profile_path)
      return
    end

    ## redirect to edit profile from new if profile is completed
    redirect_to(edit_profile_path) if request.fullpath == new_profile_path && current_user.has_completed_profile?
  end

  def inject_categories
    Models::Normalizer.normalize(Category.all)
  end

  def inject_creations
    user_creations = current_user.creations.includes(:categories, :plagiats, :creation_authors, :creation_owners)
    Models::Normalizer.normalize(user_creations) {|creation| Creations::Serializer.serialize(creation)}
  end

  def inject_creation_types
    Models::Normalizer.normalize(CreationType.includes(:licenses).all) {|type| CreationTypes::Serializer.serialize(type)}
  end

  def inject_licenses
    Models::Normalizer.normalize(License.all)
  end

  def inject_user(user = nil, public_profile = nil)
    Users::Serializer.serialize(user || current_user, public_profile)
  end

  def inject_activities
    Models::Normalizer.normalize(DomainValue.where(domain: 'activity'))
  end

  def inject_languages
    Models::Normalizer.normalize(DomainValue.where(domain: 'language'))
  end

  def init_props
    @props = {location: request.fullpath, redux: {}}
  end

  def set_redux_prop(key, data)
    @props[:redux][key] = data
  end
end
