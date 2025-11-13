class CreateCategoriesCreations < ActiveRecord::Migration[5.1]
  def change
    create_table :categories_creations do |t|
      t.integer :category_id
      t.integer :creation_id

      t.timestamps
    end
  end
end
