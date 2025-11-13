class CreationTypesLicense < ApplicationRecord
  belongs_to :creation_type
  belongs_to :license
end
