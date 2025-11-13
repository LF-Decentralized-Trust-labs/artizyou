class AddAcceptedTermsToCreations < ActiveRecord::Migration[5.1]
  def change
    add_column :creations, :accepted_terms, :boolean
  end
end
