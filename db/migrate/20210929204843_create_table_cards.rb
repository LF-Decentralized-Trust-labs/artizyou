class CreateTableCards < ActiveRecord::Migration[5.1]
  def change
    remove_column :users, :card_id if column_exists?(:users, :card_id)
    create_table :cards do |t|
      t.string :card_id
      t.integer :user_id
      t.string :brand
      t.string :country
      t.string :customer_id
      t.integer :exp_month
      t.integer :exp_year
      t.string :fingerprint
      t.string :name
      t.string :last_four_digit

      t.timestamps
    end
  end
end
