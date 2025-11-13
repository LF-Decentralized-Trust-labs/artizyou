class CreateCreations < ActiveRecord::Migration[5.1]
  def change
    create_table :creations do |t|
      t.integer :user_id
      t.integer :license_id
      t.string :kind
      t.string :name
      t.string :description
      t.integer :year
      t.string :materials

      t.attachment :file
      t.attachment :cover

      t.timestamps
    end
  end
end
