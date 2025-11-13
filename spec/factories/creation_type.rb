FactoryBot.define do
  factory :creation_type do
    kind 'image'
    name_en 'Illustration'
    name_fr 'Illustration'
    code 'PICTURE'
    file_type 'image'

    after(:create) do |creation_type, evaluator|
      creation_type.licenses = create_list(:license, 1)
    end
  end
end