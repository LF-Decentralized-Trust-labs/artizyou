class AddRegisteredCreationLimitToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :registered_creation_limit, :integer
  end
end
