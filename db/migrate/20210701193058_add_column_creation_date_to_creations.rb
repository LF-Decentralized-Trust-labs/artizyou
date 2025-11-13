class AddColumnCreationDateToCreations < ActiveRecord::Migration[5.1]
  def up
    add_column :creations, :creation_date, :date
    Creation.all.each do |creation|
      creation.update(creation_date: "01-01-#{creation.year}") if creation&.year
    end
  end

  def down
    remove_column :creations, :creation_date, :date
  end
end
