FactoryBot.define do
  factory :creation do
    name 'creation name'
    description 'creation description'
    year '2018'
    materials 'creation materials'
    creation_type_id 999
    image_file_name 'file.jpg'
    created_at(DateTime.now - 2.days)

    after(:create) do |creation, evaluator|
      creation.categories = create_list(:category, 3)
    end

    trait :image do
      kind 'image'
    end
  end
end
