FactoryBot.define do
  factory :user do
    email 'azicat@fungo.ca'
    password 'password'
    first_name 'Alexandre'
    last_name 'Zicat'
    username 'alexzicat'
    language 'en'
    activity 'Painter'
    country 'CA'
    city 'Quebec'
    description 'Ma description'
    confirmed_at Time.now
    onboarding false

    trait :without_infos do
      first_name nil
      last_name nil
    end
  end
end
