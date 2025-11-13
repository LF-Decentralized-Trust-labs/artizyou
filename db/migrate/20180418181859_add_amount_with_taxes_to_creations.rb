class AddAmountWithTaxesToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :amount_with_taxes, :integer
  end
end
