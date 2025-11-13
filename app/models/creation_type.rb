class CreationType < ApplicationRecord
  has_and_belongs_to_many :creations, dependent: :destroy
  # has_many :creation_type_licenses
  has_and_belongs_to_many :licenses, dependent: :destroy
end
