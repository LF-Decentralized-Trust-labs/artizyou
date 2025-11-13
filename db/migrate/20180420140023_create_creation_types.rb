class CreateCreationTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :creation_types do |t|
      t.string :kind
      t.string :name_fr
      t.string :name_en

      t.timestamps
    end
  end
end
