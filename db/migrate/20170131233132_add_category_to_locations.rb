class AddCategoryToLocations < ActiveRecord::Migration[5.0]
  def change
    add_column :locations, :category_id, :integer
  end
end
