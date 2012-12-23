class Picture < ActiveRecord::Base
  attr_accessible :filename, :theme_id, :user_id
  belongs_to :user
  belongs_to :theme
end
