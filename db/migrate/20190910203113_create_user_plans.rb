class CreateUserPlans < ActiveRecord::Migration[5.1]
  def change
    create_table :user_plans do |t|
      t.belongs_to :user
      t.belongs_to :plan
      t.string :charge_id
      t.integer :registered_creation_count

      t.timestamps
    end
  end
end
