class AddAttachmentVideoAudioToCreations < ActiveRecord::Migration[5.1]
  def self.up
    change_table :creations do |t|
      t.attachment :video
      t.attachment :audio
    end
  end

  def self.down
    remove_attachment :creations, :video
    remove_attachment :creations, :audio
  end
end
