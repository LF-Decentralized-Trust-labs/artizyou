class AddCreationTaxPaymentFields < ActiveRecord::Migration[5.1]
  def change
    rename_column :creations, :amount_with_taxes, :total_amount
    change_column :creations, :total_amount, :decimal, precision: 8, scale: 2
    add_column :creations, :taxes_amount, :decimal, precision: 8, scale: 2
    add_column :creations, :amount_without_taxes, :decimal, precision: 8, scale: 2
  end
end
