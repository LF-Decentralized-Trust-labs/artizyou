class AddingExpirationDatesAndStatusToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :expiration_date, :datetime
    add_column :plans, :expired, :boolean
  end
end
