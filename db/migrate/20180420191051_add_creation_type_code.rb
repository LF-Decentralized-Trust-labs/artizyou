class AddCreationTypeCode < ActiveRecord::Migration[5.1]
  def change
    add_column :creation_types, :code, :string
  end
end
