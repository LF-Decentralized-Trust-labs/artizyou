set :rvm_ruby_string, :local
set :rvm_ruby_version, "ruby-2.4.2@artizyou"
set :application, 'Artizyou'
set :repo_url, 'git@github.com:Artizyou-inc/artizyou.git'

set :format, :pretty

set :log_level, :debug

set :ssh_options, { :forward_agent => true }

set :deploy_to, '/home/web/apps/app.artizyou'

# set :pty, true

set :linked_files, %w{config/application.yml config/database.yml config/secrets.yml client/.env}
set :linked_dirs, %w{log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system public/bundles public/webpack/staging client/node_modules public/certificats}

set :keep_releases, 3

set :puma_threads, [4, 4]
set :puma_workers, 2
set :puma_worker_timeout, nil
set :puma_init_active_record, true
set :puma_daemonize, true

namespace :deploy do
  desc 'Install the required packages'
  task :yarn do
    on roles(:all) do |host|
      within "#{current_path}/client" do
        execute :yarn, :install
        execute :yarn, 'build:production'
      end
    end
  end
end

after 'deploy:publishing', 'deploy:yarn'
after 'deploy:check', 'puma:check'
after 'deploy:finished', 'puma:smart_restart'


