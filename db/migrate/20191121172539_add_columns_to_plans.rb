class AddColumnsToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :plan_duration, :integer
  end
end
