class UserPlan < ApplicationRecord
  belongs_to :user
  belongs_to :plan, optional: true
  accepts_nested_attributes_for :plan

  delegate :creation_limit, to: :plan
  attr_reader :creation_count

  def total
    amount = plan.amount
    taxes.each{|t| amount += t[:amount]}
    amount.round(2)
  end

  def taxes
    return [] unless user.state == 'QC'
    [
        {name: "TPS", amount: (plan.amount * 0.05).round(2)},
        {name: "TVQ", amount: (plan.amount * 0.0998).round(2)}
    ]
  end

  def default?
    plan.nil? || 'DEFAULT' == plan.code
  end

  def on_paying_plan?
    !default?
  end

  def all_used_up?(_creation_count=creation_count)
    creation_limit == _creation_count
  end

  def completed?
    'completed' == state
  end

  def generate_order_number
    "PL-#{SecureRandom.hex(5)}#{self.id}".upcase
  end

  def creation_count
    registered_creation_count || 0
  end
end