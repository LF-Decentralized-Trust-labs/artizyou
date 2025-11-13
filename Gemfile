source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'aws-sdk', '< 3'
gem 'bootstrap', '4.0.0.alpha6'
gem 'cancancan', '~> 2.0'
gem 'devise'
gem 'dotenv-rails', groups: [:development, :test]
gem 'figaro'
gem 'jbuilder', '~> 2.5'
gem 'money-rails', '~>1'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'nokogiri', '1.8.2'
gem 'omniauth-facebook'
gem 'omniauth-google-oauth2', '0.8.2'
gem 'omniauth-linkedin-oauth2'
gem 'paperclip', '~> 5.0.0'
gem 'paperclip-av-transcoder'
gem 'premailer-rails'
gem 'puma', '~> 4.3', '>= 4.3.8'
gem 'rails', '~> 5.1.4'
gem 'rolify', '~> 5.2.0'
gem 'rqrcode'
gem 'rest-client'
gem 'flipper'
gem 'flipper-active_record'
gem 'flipper-ui'
gem 'sass-rails', '~> 5.0'
gem 'sea_otter', git: 'git@github.com:Artizyou-inc/sea_otter.git', branch: 'master'
gem 'stripe'
#gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'whenever', require: false

gem 'wicked_pdf', '~> 1.1.0'
gem 'wkhtmltopdf-binary'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'annotate'
  gem 'capistrano'
  gem 'capistrano-rails'
  gem 'capistrano-bundler'
  gem 'capistrano-rvm'
  gem 'capistrano-nvm', require: false
  gem 'capistrano-foreman'
  gem 'capistrano3-puma', github: "seuros/capistrano-puma"
  gem 'letter_opener'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # gem 'spring'
  # gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'web-console', '>= 3.3.0'
end

group :test do
  gem 'capybara'
  gem 'capybara-screenshot'
  gem 'factory_bot_rails'
  gem 'phantomjs'
  gem 'poltergeist'
  gem 'rails-controller-testing'
  gem 'rspec-rails'
  gem 'simplecov', require: false
  gem 'sqlite3'
end

#assets monitoring
gem 'google-cloud-vision', '~> 0.28.0'

group :staging, :production do
  gem 'exception_notification'
  gem 'exception_notification-rake', '~> 0.3.0'
  gem 'slack-notifier'
end

gem 'rails_admin', '~> 1.2'
gem 'rails_admin-i18n'

gem 'zipruby'
gem 'bcrypt', '~> 3.1.15'
gem 'net-ssh', '>= 6.0.2'
gem 'ed25519', '>= 1.2', '< 2.0'
gem 'bcrypt_pbkdf', '>= 1.0', '< 2.0'
