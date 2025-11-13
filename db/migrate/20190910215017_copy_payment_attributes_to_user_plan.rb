class CopyPaymentAttributesToUserPlan < ActiveRecord::Migration[5.1]
  def change
    add_column :user_plans, :paid_without_taxes, :float
    add_column :user_plans, :taxes, :string
    add_column :user_plans, :payment_terms, :datetime
    add_column :user_plans, :encryption_terms, :datetime
    add_column :user_plans, :automatic_payment_terms, :datetime
    add_column :user_plans, :payment_date, :datetime
    add_column :user_plans, :order_number, :string
    add_column :user_plans, :paid, :string

    rename_column :creations, :total_amount, :paid
    rename_column :creations, :amount_without_taxes, :paid_without_taxes
  end
end
