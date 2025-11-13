class Plan < ApplicationRecord
  validates_presence_of :registered_creation_limit, :code, :currency
  validates :amount, presence:true, numericality: { only_float: true }
  def creation_limit
    registered_creation_limit || 0
  end

  def is_expired?
    self.expiration_date? && self.expiration_date < Date.current
  end

end