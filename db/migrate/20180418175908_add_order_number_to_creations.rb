class AddOrderNumberToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :order_number, :string
  end
end
