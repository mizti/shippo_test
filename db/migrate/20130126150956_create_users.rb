class CreateUsers < ActiveRecord::Migration
  def self.up
    create_table :users do |t|
      t.string :provider, :null => false
      t.string :uid, :null => false
      t.string :email
      t.string :name

      t.timestamps
    end
    add_index :users, [:provider, :uid]
    add_index :users, [:screen_name]
  end

  def self.down
    drop_table :users
  end

  def change
    create_table :users do |t|
      t.string :name
      t.string :uid, :null => false
      t.string :email
      t.string :provider

      t.timestamps
    end
  end
end
