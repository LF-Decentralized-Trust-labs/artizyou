class AddEncryptionTermsAutomaticPaymentTermsToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :encryption_terms, :datetime
    add_column :creations, :automatic_payment_terms, :datetime
  end
end
