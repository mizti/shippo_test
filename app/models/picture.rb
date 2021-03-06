class Picture < ActiveRecord::Base
  attr_accessible :filename, :theme_id, :user_id, :image
  belongs_to :user
  belongs_to :theme


  has_attached_file :image, styles:  {
     thumb: '100x100>',
     square: '200x200#',
     medium: '300x300>'
  }
end
