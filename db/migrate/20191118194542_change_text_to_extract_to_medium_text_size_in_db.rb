class ChangeTextToExtractToMediumTextSizeInDb < ActiveRecord::Migration[5.1]
  def change
    change_column :creations, :text_extract, :text, limit: 16.megabytes - 1
  end
end
