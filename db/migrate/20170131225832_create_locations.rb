class CreateLocations < ActiveRecord::Migration[5.0]
  def change
    create_table :locations do |t|
      t.string :title
      t.text :description
      t.text :details
      t.string :address
      t.integer :tel
      t.boolean :verified

      t.timestamps
    end
  end
end
