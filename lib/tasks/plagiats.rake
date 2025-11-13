require "#{Rails.root}/lib/plagiats.rb"
namespace :plagiats do
  namespace :watch_dog do
    desc "Images"
    task :images  => :environment do
      puts '----- IMAGES WATCHDOG START ------'
      puts Time.now
      Plagiats::WatchDog::Images.watch
      puts Time.now
      puts '----- IMAGES WATCHDOG END ------'
    end

    desc "Texts"
    task :texts  => :environment do
      puts '----- TEXTS WATCHDOG START ------'
      puts Time.now
      Plagiats::WatchDog::Texts.watch
      puts Time.now
      puts '----- TEXTS WATCHDOG END ------'
    end

    desc "test"
    task :test_text => :environment do
      pp Plagiats::WatchDog::Text.test
    end
  end
end
