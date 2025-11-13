class AddSnippetColumnToPlagiatTable < ActiveRecord::Migration[5.1]
  def change
    add_column :plagiats, :snippet, :text
  end
end
