class AddUrlToPlagiats < ActiveRecord::Migration[5.1]
  def change
    add_column :plagiats, :url, :text, limit: 500
  end
end
