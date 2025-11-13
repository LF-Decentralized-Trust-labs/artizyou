require 'rake'

module Tests
  module Assets
    class Status
      class << self

        def stale?(client_dir: 'client/**/*.js', files: files_list(client_dir))
          files.any? do |file|
            File.mtime(file) > File.mtime('client/dist/server.js')
          end
        end

        private

        def files_list(client_dir)
          files = FileList.new(Dir.glob(client_dir))
          
          files.exclude(/dist/)
          files.exclude(/node_modules/)
          files.exclude(/webpack/)

          files
        end
      end
    end
  end
end