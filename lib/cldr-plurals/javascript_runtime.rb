# encoding: UTF-8

module CldrPlurals
  module JavascriptRuntime
    class << self

      def source
        @source ||= File.read(source_file)
      end

      private

      def source_file
        @source_file ||= File.expand_path(
          './javascript_runtime.js', File.dirname(__FILE__)
        )
      end

    end
  end
end
