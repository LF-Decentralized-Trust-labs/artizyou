class AddTextExtractToCreation < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :text_extract, :text
  end
end
