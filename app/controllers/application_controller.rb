class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user  

  private  
  def current_user  
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def require_login
    if !current_user then
      redirect_to root_url, :notice => "Please sign in with Twitter account"
    end
  end

  def require_admin
  end
end
