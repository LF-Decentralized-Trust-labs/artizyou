class AddRegisteredStateToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :registered_state, :string
  end
end
