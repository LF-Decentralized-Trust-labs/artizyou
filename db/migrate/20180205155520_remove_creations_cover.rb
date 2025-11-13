class RemoveCreationsCover < ActiveRecord::Migration[5.1]
  def change
    remove_column :creations, :cover_file_name
    remove_column :creations, :cover_content_type
    remove_column :creations, :cover_file_size
    remove_column :creations, :cover_updated_at
  end
end
