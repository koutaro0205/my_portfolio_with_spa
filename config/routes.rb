Rails.application.routes.draw do
  root to: 'site#index'

	get '/signup', to: 'site#index'
	get 'users', to: 'site#index'
	get 'users/new', to: 'site#index'
	get 'users/:id', to: 'site#index'
	get 'users/:id/edit', to: 'site#index'
  get '/login', to: 'site#index'
  get 'users/:id/following', to: 'site#index'
  get 'users/:id/followers', to: 'site#index'
  get 'users/:id/favorite_recipes', to: 'site#index'
  get 'password_resets/new', to: 'site#index'
  get 'password_resets/:id/edit', to: 'site#index', as: 'edit_password_resets'
  get 'account_activations/:id/edit', to: 'site#index', as: 'edit_account_activations'

  get 'recipes', to: 'site#index'
	get 'recipes/new', to: 'site#index'
	get 'recipes/:id', to: 'site#index'
	get 'recipes/:id/edit', to: 'site#index'
  get '/search', to: 'site#index'
  get '/conditional_search', to: 'site#index'

  get 'categories', to: 'site#index'
  get 'categories/:id', to: 'site#index'
  get 'categories/:id/edit', to: 'site#index'

  get 'questions', to: 'site#index'
  get 'questions/new', to: 'site#index'
	get 'questions/:id', to: 'site#index'
	get 'questions/:id/edit', to: 'site#index'
  get '/questions/search', to: 'site#index'

	namespace :api do
		resources :users, format: 'json' do
      member do
        get :following, :followers, :favorite_recipes, :interesting_questions
      end
    end
		resources :recipes, format: 'json' do
      resources :comments, only: [:create, :destroy], format: 'json'
      collection do
        get :user_favorites, :following_recipes, :conditional_search
      end
    end
    resources :questions, format: 'json' do
      resources :question_comments, only: [:create, :destroy, :index], format: 'json'
      collection do
        get 'search'
      end
    end
    resources :password_resets, only: [:new, :create, :edit, :update], format: 'json'
    resources :account_activations, only: [:edit], format: 'json'
    resources :relationships, only: [:create, :destroy], format: 'json'
    resources :favorites, only: [:create, :destroy], format: 'json'
    resources :categories, except: [:new], format: 'json'
    resources :interests, only: [:create, :destroy], format: 'json'

    post '/login', to: 'sessions#create', format: 'json'
    delete '/logout', to: 'sessions#destroy', format: 'json'
    get '/logged_in', to: 'sessions#logged_in?', format: 'json'
    get '/admin_user', to: 'users#admin_user?', format: 'json'
    get '/show_users', to: 'users#show_users?', format: 'json'
    get '/home', to: 'home#index', format: 'json'
    get '/follow_status/:id', to: 'users#follow_status', format: 'json'
    get '/favorite_status/:id', to: 'users#favorite_status', format: 'json'
    get '/interest_status/:id', to: 'users#interest_status', format: 'json'
    get '/recipes/:recipe_id/comments', to: 'comments#show_comments', format: 'json'
    get '/search', to: 'recipes#search', format: 'json'
    get '/current_image', to: 'users#current_image?', format: 'json'
	end
end
