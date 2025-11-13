class RemoveCreationLicenseId < ActiveRecord::Migration[5.1]
  def change
    remove_column :creations, :license_id
  end
end
