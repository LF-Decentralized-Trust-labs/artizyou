# == Schema Information
#
# Table name: plagiats
#
#  id          :integer          not null, primary key
#  creation_id :integer
#  url         :string(4000)
#  score       :string(255)
#  excluded    :boolean
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Plagiat < ApplicationRecord
  belongs_to :creation
end
