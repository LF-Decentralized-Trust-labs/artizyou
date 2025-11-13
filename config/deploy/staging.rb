set :rails_env, 'staging'

role :app, %w{web@app.artizyou.fungogp.ca}
role :web, %w{web@app.artizyou.fungogp.ca}
role :db,  %w{web@app.artizyou.fungogp.ca}

set :branch, 'staging'
set :stage, :staging

set :nvm_type, :user # or :system, depends on your nvm setup
set :nvm_node, 'v8.17.0'
set :nvm_map_bins, %w{node npm yarn}

set :whenever_identifier, -> { "ArtizyouStaging" }
set :whenever_variables, -> { "'environment=staging'" }