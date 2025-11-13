class AddBlockchainErrorToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :blockchain_error, :text
  end
end
