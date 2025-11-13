class RemovePlanIdFromUsers < ActiveRecord::Migration[5.1]
  def self.up
    remove_column :users, :plan_id
  end
end
