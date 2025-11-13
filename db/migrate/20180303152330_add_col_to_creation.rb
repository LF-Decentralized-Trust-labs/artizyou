class AddColToCreation < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :document_id, :string
  end
end
