class AddStateToUserPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :user_plans, :state, :string
  end
end
