set :output, "log/cron_log.log"

if @environment == 'production'
  every :day, at: '4:30 am' do
    rake "plagiats:watch_dog:images"
  end

  every '0 0 15 * *' do
    rake "plagiats:watch_dog:texts"
  end
end

# if @environment == 'staging'# || @environment == 'development'
#   every 1.minutes do
#     rake "plagiats:watch_dog:images"
#   end
#
#   every 1.minutes do
#     rake "plagiats:watch_dog:texts"
#   end
# end