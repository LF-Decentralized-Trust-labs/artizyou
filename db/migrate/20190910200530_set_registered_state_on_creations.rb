class SetRegisteredStateOnCreations < ActiveRecord::Migration[5.1]
  def self.up
    Creation.all.each do |c|
      c.update(registered_state: (c.tx_hash && c.contract_address ? 'registered' : (c.tx_hash ? 'building' : (c.charge_id ? 'requested' : nil))))
    end
  end

  def self.down
    Creation.update_all(registered_state: nil)
  end
end
