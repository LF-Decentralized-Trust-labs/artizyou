class DeleteCreationBrandName < ActiveRecord::Migration[5.1]
  def change
    remove_column :creations, :brand_name
  end
end
