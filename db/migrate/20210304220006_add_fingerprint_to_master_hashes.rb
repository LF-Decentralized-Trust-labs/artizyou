class AddFingerprintToMasterHashes < ActiveRecord::Migration[5.1]
  def change
    add_column :master_hashes, :fingerprint, :string
  end
end
