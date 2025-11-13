class AddPublicationYearAndTerritoriesToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :published_territories, :text
    add_column :creations, :publication_year, :int
  end
end
