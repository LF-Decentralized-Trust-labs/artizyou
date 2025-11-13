class AddColumnNewFeatureExpiryDateToCreationType < ActiveRecord::Migration[5.1]
  def change
    add_column :creation_types, :new_feature_expiry_date, :date
  end
end
