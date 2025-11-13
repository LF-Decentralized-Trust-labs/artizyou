class RemovingUselessPlanColumns < ActiveRecord::Migration[5.1]
  def change
    remove_column :plans, :plan_duration
    remove_column :plans, :expired
  end
end
