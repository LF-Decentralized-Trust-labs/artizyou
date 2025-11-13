class AddColToCreationTypeLicences < ActiveRecord::Migration[5.1]
  def change
    rename_table :creation_type_licenses, :creation_types_licenses
  end
end
