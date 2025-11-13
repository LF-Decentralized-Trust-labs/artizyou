module Users
  class Serializer
    def self.serialize(user, public_profile = false)
      attributes = ['email', 'username', 'first_name', 'last_name', 'language', 'activity', 'activity_precision',
          'address', 'country', 'state', 'city', 'accepted_terms', 'created_at', 'updated_at', 'onboarding',
          'facebook_url', 'twitter_url', 'linked_in_url', 'personnal_website', 'professional_website', 'ethereum_wallet_address'
      ]

      serialized_user = user.attributes.extract!(*attributes)

      serialized_user[:userId] = user.id
      serialized_user[:completedProfile] = user.has_completed_profile?
      serialized_user[:description] = user.description || ''
      serialized_user[:photo] = {}
      serialized_user[:photo][:preview] = user.photo.expiring_url(86400) if user.photo.present?

      serialized_user[:public_profile] = public_profile if public_profile.present?

      serialized_user[:cards] = user.cards if user.cards.present?

      user_plan = user.user_plan
      plans = Plan.all if Plan.all.present?
      serialized_user[:plans] = plans
      serialized_user[:plan] = user_plan.plan.attributes.symbolize_keys!.slice(:code, :amount, :currency)
      serialized_user[:plan][:taxes] = user_plan.taxes
      serialized_user[:plan][:total] = user_plan.total
      serialized_user[:plan][:creation_count] = user_plan.creation_count
      serialized_user[:plan][:creation_limit] = user_plan.creation_limit
      serialized_user[:plan][:limited] = !user_plan.default? && user_plan.plan.registered_creation_limit
      serialized_user[:plan][:charge_id] = user_plan.charge_id

      registrationsLeft = (user_plan.creation_limit - user_plan.creation_count)
      allow_register_without_payment = (registrationsLeft && registrationsLeft > 0)
      serialized_user[:allow_register_without_payment] =
          allow_register_without_payment && (
            user_plan.default? || user_plan.charge_id
          )

      serialized_user[:public_url] = "#{ENV['APP_URL']}#{ENV['PUBLIC_PROFILE_PATH']}/#{user.username}"

      serialized_user[:plan] = serialized_user[:plan].camelize_keys
      serialized_user[:site_faq] = "#{ENV['SITE_URL']}#{ENV['FAQ_PATH']}"
      serialized_user[:enabled_us_copy_right_feature] = Flipper.enabled?(:us_copy_right)

      Rails.logger.info("serialized_user = #{serialized_user}")

      serialized_user.camelize_keys
    end
  end
end
