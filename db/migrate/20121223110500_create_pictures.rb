class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.integer :user_id
      t.integer :theme_id
      t.string :filename

      t.timestamps
    end
  end
end
