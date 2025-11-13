class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :activity, :string
    add_column :users, :activity_precision, :text
    add_column :users, :country, :string
    add_column :users, :city, :string
    add_column :users, :description, :text
  end
end
