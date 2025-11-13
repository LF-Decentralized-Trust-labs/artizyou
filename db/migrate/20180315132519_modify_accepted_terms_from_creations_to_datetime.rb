class ModifyAcceptedTermsFromCreationsToDatetime < ActiveRecord::Migration[5.1]
  def change
    change_column :creations, :accepted_terms, :datetime
  end
end
