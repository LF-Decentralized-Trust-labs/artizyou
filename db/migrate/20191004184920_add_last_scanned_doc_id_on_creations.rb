class AddLastScannedDocIdOnCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :last_scanned_doc_id, :string
  end
end
