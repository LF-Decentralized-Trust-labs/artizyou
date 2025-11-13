class ModifyDescriptionFromCreationsToText < ActiveRecord::Migration[5.1]
  def change
    change_column :creations, :description, :text
  end
end
