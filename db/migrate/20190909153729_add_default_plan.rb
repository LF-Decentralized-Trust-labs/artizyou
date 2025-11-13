class AddDefaultPlan < ActiveRecord::Migration[5.1]
  def change
    Plan.create!(code: 'DEFAULT', amount: 85.50, currency: 'CAD')
    Plan.create!(code: '5-FOR-1', amount: 85.50, currency: 'USD')
  end
end
