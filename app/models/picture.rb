class Picture < ActiveRecord::Base
  attr_accessible :filename, :theme_id, :user_id, :image_file_name, :image_content_type, :image_file_size, :image_updated_at
  belongs_to :user
  belongs_to :theme

  has_attached_file :image, styles:  {
     thumb: '100x100>',
     square: '200x200#',
     medium: '300x300>'
  }
end
