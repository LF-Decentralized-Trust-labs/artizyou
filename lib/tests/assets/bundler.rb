require 'open3'

module Tests
  module Assets
    class Bundler
      class << self

        def generate(cmd = 'cd client && yarn build:test')
          puts "\nBundling assets"
          puts "\nRunning : #{cmd}"

          stdout, stderr, status = Open3.capture3(cmd)

          if status.success?
            puts "\nDone bundling"
          else
            puts "\n#{stdout}"
            puts "\n#{stderr}"
          end
        rescue => error
          puts "\nError while bundling assets."
          puts "\n#{error}"
        end
      end
    end
  end
end