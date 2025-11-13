class AddCreationAuthorOwner < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :author, :string
    add_column :creations, :owner, :string
  end
end
