class ChangeSourcesToBeTextInCreationV2s < ActiveRecord::Migration[5.1]
    def up
      change_column :creation_v2s, :sources, :text
    end
  
    def down
      change_column :creation_v2s, :sources, :integer
    end
  end
  