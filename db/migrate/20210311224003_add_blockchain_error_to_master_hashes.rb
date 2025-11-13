class AddBlockchainErrorToMasterHashes < ActiveRecord::Migration[5.1]
  def change
    add_column :master_hashes, :blockchain_error, :string
  end
end
