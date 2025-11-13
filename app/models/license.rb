# == Schema Information
#
# Table name: licenses
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  url        :string(255)
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class License < ApplicationRecord
  has_and_belongs_to_many :creation_types
end
