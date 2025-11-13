class AddFingerprintToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :fingerprint, :string
  end
end
