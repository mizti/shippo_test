class User < ActiveRecord::Base
  has_many :pictures
  attr_accessible :email, :name, :provider, :uid
  def self.create_with_omniauth(auth)
    begin
      create! do |user|
        user.provider = auth['provider']
        #mixiの場合
        if auth['provider'] == 'mixi' then
          auth['provider'].sub!('http://id.mixi.jp/','')
        end

        user.uid = auth['uid']
        if auth['info']
          user.name =  auth['info']['name']
        end
        if auth['extra']['user_hash']
        end
      end
    end
  end
end
