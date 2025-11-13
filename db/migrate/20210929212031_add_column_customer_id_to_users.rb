class AddColumnCustomerIdToUsers < ActiveRecord::Migration[5.1]
  def change
    unless column_exists?(:users, :customer_id)
      add_column :users, :customer_id, :string
    end
  end
end
