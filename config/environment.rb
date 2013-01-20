# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
ShippoTest::Application.initialize!

#Log Output with Timestamp
require File.dirname(__FILE__) + "/../lib/logger_with_timestamp"
