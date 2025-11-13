# == Schema Information
#
# Table name: users
#
#  id                     :integer          not null, primary key
#  email                  :string(255)      default(""), not null
#  encrypted_password     :string(255)      default(""), not null
#  reset_password_token   :string(255)
#  reset_password_sent_at :datetime
#  remember_created_at    :datetime
#  sign_in_count          :integer          default(0), not null
#  current_sign_in_at     :datetime
#  last_sign_in_at        :datetime
#  current_sign_in_ip     :string(255)
#  last_sign_in_ip        :string(255)
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#  first_name             :string(255)
#  last_name              :string(255)
#  confirmation_token     :string(255)
#  confirmed_at           :datetime
#  confirmation_sent_at   :datetime
#  unconfirmed_email      :string(255)
#
class User < ApplicationRecord
  rolify
  devise :confirmable, :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable
  devise :omniauthable, omniauth_providers: [:facebook, :google_oauth2, :linkedin]

  has_many :authorizations, dependent: :destroy
  has_many :creations, dependent: :destroy

  has_many :user_plans, dependent: :destroy
  accepts_nested_attributes_for :user_plans

  has_many :cards, dependent: :destroy
  accepts_nested_attributes_for :cards

  has_attached_file :photo
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
  validates_presence_of :email

  before_save do
    self.language = 'en'
  end

  def has_completed_profile?
    username.present? &&
        first_name.present? &&
        last_name.present? &&
        activity.present? &&
        country.present? &&
        city.present?
  end

  class << self
    def from_omniauth(auth, plan_code = nil)
      authorization = Authorization.where(
          provider: auth.provider,
          uid: auth.uid.to_s,
      ).first_or_initialize
      Rails.logger.info("AUTH infos sent by LinkedIN: #{auth.inspect}")

      if authorization.user.blank?
        email = auth.info.email

        authorization.user = User.find_by_email(email)

        if authorization.user.blank?
          user = authorization.build_user(email: email, first_name: auth.info.first_name, last_name: auth.info.last_name, password: Devise.friendly_token[0, 10])

          user.skip_confirmation!

          if plan_code
            user.user_plans = []
            user.user_plans.build(plan: Plan.find_by_code(plan_code))
          end
        end

        authorization.save!
      end

      authorization.user
    end
  end

  def admin?
    self.has_role?(:super_admin)
  end

  def user_plan
    non_completed_plan || switch_to_default_plan
  end

  def non_completed_plan
    user_plans.detect { |p| !p.completed? }
  end

  def switch_to_default_plan
    user_plans.build.tap do |up|
      up.plan = Plan.find_by_code('DEFAULT')
    end
  end

  def increment_registered_creations
    new_creation_count = user_plan.creation_count + 1
    update_attrs = {
        registered_creation_count: new_creation_count
    }
    if user_plan.all_used_up?(new_creation_count)
      update_attrs.merge!(state: 'completed')
    end
    user_plan.update(update_attrs)
  end

  rails_admin do
    edit do
      exclude_fields :confirmation_token, :confirmation_sent_at, :unconfirmed_email, :last_sign_in_ip,
      :sign_in_count, :current_sign_in_at, :last_sign_in_at, :current_sign_in_ip, :cards, :user_plans,
      :reset_password_sent_at, :remember_created_at, :activity, :authorizations, :language, :activity_precision, :description
      field :confirmed_at do
        required true
      end
      field :username do
        required true
      end
    end
  end
end
