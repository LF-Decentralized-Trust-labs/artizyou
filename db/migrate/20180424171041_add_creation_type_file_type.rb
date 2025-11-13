class AddCreationTypeFileType < ActiveRecord::Migration[5.1]
  def change
    add_column :creation_types, :file_type, :string
  end
end
