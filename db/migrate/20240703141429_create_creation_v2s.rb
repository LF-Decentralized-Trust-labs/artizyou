class CreateCreationV2s < ActiveRecord::Migration[5.1]
  def change
    create_table :creation_v2s do |t|
      t.integer :user_id
      t.integer :creation_id
      t.string :kind
      t.string :file
      t.string :score
      t.text :text_extract
      t.string :annotated_text
      t.integer :detections
      t.integer :sources
      t.integer :excluded
      t.datetime :created_at
      t.datetime :updated_at

      t.timestamps
    end
  end
end
