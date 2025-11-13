class AddChargeIdToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :charge_id, :string
  end
end
