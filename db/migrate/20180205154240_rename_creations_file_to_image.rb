class RenameCreationsFileToImage < ActiveRecord::Migration[5.1]
  def change
    rename_column :creations, :file_file_name, :image_file_name
    rename_column :creations, :file_content_type, :image_content_type
    rename_column :creations, :file_file_size, :image_file_size
    rename_column :creations, :file_updated_at, :image_updated_at
  end
end
