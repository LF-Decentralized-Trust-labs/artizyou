class AddAttachmentVirtualObjectToCreations < ActiveRecord::Migration[5.1]
  def self.up
    change_table :creations do |t|
      t.attachment :virtual_object
    end
  end

  def self.down
    remove_attachment :creations, :virtual_object
  end
end
