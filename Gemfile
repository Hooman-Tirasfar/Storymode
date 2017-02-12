source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


gem 'rails', '~> 5.0.1'
gem 'pg', '~> 0.18'
gem 'puma', '~> 3.0'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'coffee-rails', '~> 4.2'
gem 'forest_liana'
gem 'jquery-rails'
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
gem 'devise'
gem 'cancan'
gem 'paperclip'
gem 'font-awesome-sass'
gem 'bootstrap-sass'
gem 'sprockets-rails'

group :development, :test do
  	gem 'byebug', platform: :mri
  	gem 'dotenv-rails'
	  gem "better_errors"
	  gem "binding_of_caller"
    gem 'capistrano', '~> 3.7', '>= 3.7.1'
gem 'capistrano-rails', '~> 1.2'
gem 'capistrano-passenger', '~> 0.2.0'

# Add this if you're using rbenv
 gem 'capistrano-rbenv', '~> 2.1'

end

group :development do
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
