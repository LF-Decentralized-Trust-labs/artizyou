class AddRegistrationCountToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :registrations, :integer
  end
end
