require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dicmode
  class Application < Rails::Application
		config.assets.paths << Rails.root.join('vendor', 'assets', 'fonts')
		config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/
  end

end
