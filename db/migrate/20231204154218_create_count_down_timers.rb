class CreateCountDownTimers < ActiveRecord::Migration[5.1]
  def change
    create_table :count_down_timers do |t|
      t.datetime :timer_end_date
      t.boolean :show_counter, default: true

      t.timestamps
    end
    CountDownTimer.create(timer_end_date: Date.parse('15-12-2023'))
  end
end
