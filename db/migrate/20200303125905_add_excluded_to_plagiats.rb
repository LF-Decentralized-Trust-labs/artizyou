class AddExcludedToPlagiats < ActiveRecord::Migration[5.1]
  def change
    add_column :plagiats, :excluded, :boolean
  end
end
