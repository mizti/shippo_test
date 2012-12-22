# coding: utf-8
class HelloController < ApplicationController
  def index #action method must be a public method
    render :text => 'こんにちは'
  end
  def view
    @msg = 'viewメソッドからこんにちは'
  end
end
