class AddLicenseCode < ActiveRecord::Migration[5.1]
  def change
    add_column :licenses, :code, :string
  end
end
