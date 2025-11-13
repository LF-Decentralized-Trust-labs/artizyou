class CreateAuthors < ActiveRecord::Migration[5.1]
  def change
    create_table :authors do |t|
      t.boolean :is_org
      t.string :org_name
      t.string :first_name
      t.string :last_name
      t.string :citizenship
      t.string :domicile
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.string :mail
      t.string :type
      t.references :creation, foreign_key: true

      t.timestamps
    end
  end
end
