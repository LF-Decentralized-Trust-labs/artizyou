class CreateCreationTypeLicenses < ActiveRecord::Migration[5.1]
  def change
    create_table :creation_type_licenses, id: false do |t|
      t.integer :creation_type_id
      t.integer :license_id
      t.timestamps
    end
  end
end
