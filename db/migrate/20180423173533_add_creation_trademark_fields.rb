class AddCreationTrademarkFields < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :brand_name, :string
    add_column :creations, :first_market_use, :date
    add_column :creations, :operating_territories, :text
  end
end