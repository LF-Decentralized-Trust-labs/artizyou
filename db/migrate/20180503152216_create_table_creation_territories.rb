class CreateTableCreationTerritories < ActiveRecord::Migration[5.1]
  def change
    create_table :creation_territories do |t|
      t.integer :creation_id
      t.string :country_code

      t.timestamps
    end
  end
end
