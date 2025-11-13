class AddAttachmentQrCodeToCreations < ActiveRecord::Migration[5.1]
  def self.up
    change_table :creations do |t|
      t.attachment :qr_code
    end
  end

  def self.down
    remove_attachment :creations, :qr_code
  end
end
