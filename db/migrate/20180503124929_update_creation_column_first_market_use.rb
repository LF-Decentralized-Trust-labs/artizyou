class UpdateCreationColumnFirstMarketUse < ActiveRecord::Migration[5.1]
  def change
    change_column :creations, :first_market_use, :integer
  end
end
