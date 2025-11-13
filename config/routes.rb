Rails.application.routes.draw do
  flipper_app = Flipper::UI.app do |builder|
    builder.use Rack::Auth::Basic do |username, password|
      username == ENV['FLIPPER_USERNAME'] && password == ENV['FLIPPER_PASSWORD']
    end
  end
  mount flipper_app, at: '/flipper'
  resources :master_hashes, only: [:show, :create, :update] do
    member do
      post :confirm_registration
      post :registration_error
    end
  end
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  devise_for :users, controllers: {
      registrations: "registrations",
      omniauth_callbacks: 'users/omniauth_callbacks',
      confirmations: 'confirmations'
  }

  root to: redirect('/creations')

  scope '/creations' do
    get '/', to: Constants::HOME_CONTROLLER_ROUTE, as: :creations
    get '/:id', to: Constants::HOME_CONTROLLER_ROUTE, as: :creation
    get '/:id/completed', to: Constants::HOME_CONTROLLER_ROUTE, as: :creation_completed
    get '/:id/completed_with_code', to: Constants::HOME_CONTROLLER_ROUTE, as: :creation_completed_with_code
    get '/:id/completed_without_blockchain', to: Constants::HOME_CONTROLLER_ROUTE, as: :creation_completed_without_bc

    scope '/new' do
      get '/infos', to: redirect(Constants::NEW_CREATION_KIND_ROUTE), as: :new_creation_infos
      get '/kind', to: Constants::HOME_CONTROLLER_ROUTE, as: :new_creation_kind
      get '/type', to: redirect(Constants::NEW_CREATION_KIND_ROUTE), as: :new_creation_type
      get '/registration', to: redirect(Constants::NEW_CREATION_KIND_ROUTE), as: :new_creation_registration
    end
  end

  scope '/profile' do
    get '/new', to: Constants::HOME_CONTROLLER_ROUTE, as: :new_profile
    get '/edit', to: Constants::HOME_CONTROLLER_ROUTE, as: :edit_profile
    get '/:username', to: 'home#show', as: :public_profile
  end

  resources :creations, only: [:show, :create, :update] do
    collection do
      post :payment_intent
    end
    member do
      post :pay
      post :register
      post :certify
      post :confirm_registration
      post :registration_error
      get :blockchain_register
      get :scan
      put :update_authors_owners
    end

    resources :plagiats, only: [:index], to: 'creations#plagiats'
  end

  get '/creations/:id', to: Constants::HOME_CONTROLLER_ROUTE
  put '/creations/:id/delete_author/:author_id', to: 'creations#delete_author', as: :delete_author
  put '/creations/:id/exclude_plagiarism_detection/:plagiat_id', to: 'creations#exclude_plagiarism_detection', as: :exclude_plagiarism_detection

  resources :users, only: [:update, :show] do
    put :pay, on: :member
    collection do
      post :delete_data
      get '/verify_username/:username', to: 'users#verify_username', as: :verify_username
    end
  end

  resource :current_user, controller: :current_user, only: [] do
    put :pay, on: :member
  end

  resources :plagscans, only: [:show]
  get 'plagscans', controller: :plagscans, action: :show
  get '/terms_of_use', to: Constants::HOME_CONTROLLER_ROUTE, as: :conditions_of_use
  get '/privacy_policy', to: Constants::HOME_CONTROLLER_ROUTE, as: :other_legal_terms
  get '/plagiarism_help_guide', to: Constants::HOME_CONTROLLER_ROUTE, as: :plagiarism_help_guide
  get '/pay', to: Constants::HOME_CONTROLLER_ROUTE, as: :pay


  get '/plan/:code', controller: :plans, action: :show
  resources :count_downs, only: [:show]
end
