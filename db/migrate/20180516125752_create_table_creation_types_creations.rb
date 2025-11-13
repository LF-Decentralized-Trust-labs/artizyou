class CreateTableCreationTypesCreations < ActiveRecord::Migration[5.1]
  def change
    create_table :creation_types_creations do |t|
      t.integer :creation_type_id
      t.integer :creation_id
    end
  end
end
