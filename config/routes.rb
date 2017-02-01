Rails.application.routes.draw do
  resources :categories
  devise_for :users
  resources :locations

  root 'pages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end