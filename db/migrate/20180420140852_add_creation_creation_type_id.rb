class AddCreationCreationTypeId < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :creation_type_id, :integer
  end
end
