class AddPaymentDateToCreation < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :payment_date, :datetime
    add_column :creations, :registration_date, :datetime
  end
end
