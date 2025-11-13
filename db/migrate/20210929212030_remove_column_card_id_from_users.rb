class RemoveColumnCardIdFromUsers < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :card_id if column_exists?(:users, :card_id)
  end
end
