class AddPaymentTermsToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :payment_terms, :datetime
  end
end
