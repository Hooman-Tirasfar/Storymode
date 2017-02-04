class PagesController < ApplicationController
  def index
    @locations = Location.all
    @categories = Category.all
  end

end
