class Picture < ActiveRecord::Base
  attr_accessible :filename, :theme_id, :user_id
end
