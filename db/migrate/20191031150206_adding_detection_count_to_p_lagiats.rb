class AddingDetectionCountToPLagiats < ActiveRecord::Migration[5.1]
  def change
    add_column :plagiats, :detections, :integer
  end
end
