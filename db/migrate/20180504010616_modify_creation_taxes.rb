class ModifyCreationTaxes < ActiveRecord::Migration[5.1]
  def change
    rename_column :creations, :taxes_amount, :taxes
    change_column :creations, :taxes, :text
  end
end
