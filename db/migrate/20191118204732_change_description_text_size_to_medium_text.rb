class ChangeDescriptionTextSizeToMediumText < ActiveRecord::Migration[5.1]
  def change
    change_column :users, :description, :text, limit: 16.megabytes - 1
    change_column :creations, :description, :text,  limit: 16.megabytes - 1
  end
end
