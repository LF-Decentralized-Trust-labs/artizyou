class CreatePlagiat < ActiveRecord::Migration[5.1]
  def change
    create_table :plagiats do |t|
      t.integer :creation_id
      t.string :url, limit: 4000
      t.string :score
      t.boolean :excluded
      t.timestamps
    end
  end
end
