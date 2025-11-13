class AddDocumentToCreation < ActiveRecord::Migration[5.1]
  def change
    add_attachment :creations, :document
  end
end
