class CleaningUpPlagiatsTable < ActiveRecord::Migration[5.1]
  def change
    remove_column :plagiats, :url
    remove_column :plagiats, :excluded
    rename_column :plagiats, :snippet, :annotated_text
  end
end
