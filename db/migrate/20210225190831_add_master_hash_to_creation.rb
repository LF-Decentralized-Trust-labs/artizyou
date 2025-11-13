class AddMasterHashToCreation < ActiveRecord::Migration[5.1]
  def change
    add_reference :creations, :master_hash, foreign_key: true
  end
end
