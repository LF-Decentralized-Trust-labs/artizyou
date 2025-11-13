class AddContractAddressToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :contract_address, :string
  end
end
