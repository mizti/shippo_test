class Logger
  private
    if method_defined?(:formatter=)
      def format_message_with_datetime(severity, timestamp, progname, msg)
        app_format_message(msg, severity)
      end
    else
      def format_message_with_datetime(severity, timestamp, msg, progname)
        app_format_message(msg, severity)
      end
    end
    
    def app_format_message(msg, severity)
      time = Time.now
      time_str = time.strftime("%Y-%m-%d %H:%M:%S.") << "["+ severity.to_s + "] "  #<< "%06d " % time.usec
      msg.split(/\n/).collect { |line| line =~ /^\s*$/ ? line : time_str + line }.join("\n") + "\n"
    end
    
    alias_method :format_message_without_datetime, :format_message
    alias_method :format_message, :format_message_with_datetime
end
