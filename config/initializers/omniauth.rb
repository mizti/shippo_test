Rails.application.config.middleware.use OmniAuth::Builder do
  require 'openid/store/filesystem'
  provider :twitter, ENV['TWITTER_KEY'], ENV['TWITTER_SECRET']
  provider :facebook, ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']

  provider :openid, :store => OpenID::Store::Filesystem.new("/tmp"), :name => "cloudn", :identifier => "idp.example.com/jos-webapp-1.2-SNAPSHOT"
  provider :openid, :store => OpenID::Store::Filesystem.new('/tmp'), :name=>'yahoo',  :identifier => 'yahoo.co.jp'
  provider :openid, :store => OpenID::Store::Filesystem.new('/tmp'), :name=>'google', :identifier => 'https://www.google.com/accounts/o8/id'
  provider :openid, :store => OpenID::Store::Filesystem.new('/tmp'), :name=>'mixi', :identifier => 'mixi.jp'
end
