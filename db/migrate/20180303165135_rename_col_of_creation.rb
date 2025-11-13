class RenameColOfCreation < ActiveRecord::Migration[5.1]
  def change
    rename_column :creations, :document_id, :scanned_document_id
  end
end
