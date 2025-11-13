set :rails_env, 'production'

role :app, %w{web@louisville.fungogp.ca}
role :web, %w{web@louisville.fungogp.ca}
role :db,  %w{web@louisville.fungogp.ca}

set :branch, 'staging'

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v8.17.0'
set :nvm_map_bins, %w{node npm yarn}

set :whenever_identifier, -> { "Artizyou" }
set :whenever_variables, -> { "'environment=production'" }