class AddColumnEthereumTokenToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :ethereum_wallet_address, :string
  end
end
