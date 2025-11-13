class ChangeColumnPublicationYearOfCreation < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :publication_date, :date, default: nil
  end
end
