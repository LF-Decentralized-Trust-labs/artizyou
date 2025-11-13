class AddPlanToInfluencers < ActiveRecord::Migration[5.1]
  def change
    add_column :influencers, :plan_id, :integer
  end
end
