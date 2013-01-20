class User < ActiveRecord::Base
  has_many :pictures
  attr_accessible :name, :provider
end
