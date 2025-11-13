class MasterHash < ApplicationRecord
    class_attribute :hash_amount
    self.hash_amount = 250
end
