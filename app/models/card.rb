class Card < ApplicationRecord
  belongs_to :user

  after_create :update_customer_id

  private
  def update_customer_id
    self.user.update(customer_id: self.customer_id)
  end
end
