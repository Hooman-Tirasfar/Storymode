json.extract! location, :id, :title, :description, :details, :address, :tel, :verified, :created_at, :updated_at
json.url location_url(location, format: :json)