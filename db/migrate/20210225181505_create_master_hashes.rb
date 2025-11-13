class CreateMasterHashes < ActiveRecord::Migration[5.1]
  def change
    create_table :master_hashes do |t|
      t.string :contract_address
      t.string :tx_hash
      t.string :status

      t.timestamps
    end
  end
end
