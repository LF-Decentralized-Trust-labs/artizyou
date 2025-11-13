class AddInfluencerInfosToPlans < ActiveRecord::Migration[5.1]
  def change
    add_column :plans, :influencer_name, :string
  end
end
