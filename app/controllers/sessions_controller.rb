class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    user = User.where(:provider => auth['provider'], :uid => auth['uid']).first || User.create_with_omniauth(auth)
    session[:user_id] = user.id
    redirect_to root_url, :notice => "Sign in successful"
  end

  def failure
    redirect_to root_url, :alert => "Authentication error: #{params[:message].humanize}"
  end

  def new
    return redirect_to "/auth/#{params[:service]}"
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url, :notice => "Signed out"
  end
end
