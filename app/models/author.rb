class Author < ApplicationRecord
  belongs_to :creation
  validates :mail, format: { with: URI::MailTo::EMAIL_REGEXP } 
end
