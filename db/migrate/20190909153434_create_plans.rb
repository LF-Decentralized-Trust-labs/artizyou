class CreatePlans < ActiveRecord::Migration[5.1]
  def change
    create_table :plans do |t|
      t.string :code
      t.float :amount
      t.string :currency
      t.boolean :deleted
    end
  end
end
