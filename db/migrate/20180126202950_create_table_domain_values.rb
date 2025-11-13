class CreateTableDomainValues < ActiveRecord::Migration[5.1]
  def change
    create_table :domain_values do |t|
      t.string :value
      t.string :domain
      t.boolean :status
      t.string :locale
      t.string :description
    end
  end
end
