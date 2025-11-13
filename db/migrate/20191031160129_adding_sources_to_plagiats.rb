class AddingSourcesToPlagiats < ActiveRecord::Migration[5.1]
  def change
    add_column :plagiats, :sources , :integer
  end
end
