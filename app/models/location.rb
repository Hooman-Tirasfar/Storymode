class Location < ApplicationRecord
	belongs_to :user
	belongs_to :category

	  has_attached_file :image, styles: { medium: "457x400>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  		validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

end
