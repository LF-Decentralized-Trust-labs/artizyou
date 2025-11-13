class AddTxHashToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :tx_hash, :string
  end
end
