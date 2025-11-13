require 'rails_helper'
require 'tests/assets/status'

RSpec.describe Tests::Assets::Status, type: :lib do
  subject {Tests::Assets::Status}

  context '.stale?' do
    let(:client_file) {'client/test.js'}
    let(:file_list) {FileList.new([client_file])}
    let(:glob) {Dir.glob(client_dir)}
    let(:today) {Date.today}
    let(:server_bundle) {'client/dist/server.js'}
    let(:yesterday) {today - 1.day}

    before(:each, :default_file_list) {
      expect(FileList).to receive(:new).with(glob).and_return(file_list)
    }

    before(:each, :params_files_list) {
      expect(FileList).not_to receive(:new)
    }

    before(:each, :stale) {
      expect(File).to receive(:mtime).with(client_file).and_return(today)
      expect(File).to receive(:mtime).with(server_bundle).and_return(yesterday)
    }

    before(:each, :not_stale) {
      expect(File).to receive(:mtime).with(client_file).and_return(yesterday)
      expect(File).to receive(:mtime).with(server_bundle).and_return(today)
    }

    context 'with default client directory' do
      let(:client_dir) {'client/**/*.js'}

      context 'with default files list', :default_file_list do
        context 'stale', :stale do
          it 'returns true' do
            expect(subject.stale?).to be_truthy
          end
        end

        context 'not stale', :not_stale do
          it 'returns true' do
            expect(subject.stale?).to be_falsey
          end
        end
      end

      context 'with params files list', :params_files_list do
        let(:client_file) {'client/params/test.js'}

        context 'stale', :stale do
          it 'returns true' do
            expect(subject.stale?(files: [client_file])).to be_truthy
          end
        end

        context 'not stale', :not_stale do
          it 'returns true' do
            expect(subject.stale?(files: [client_file])).to be_falsey
          end
        end
      end
    end

    context 'with params client directory' do
      let(:client_dir) {'client/params/**/*.js'}

      context 'with default files list', :default_file_list do
        let(:client_file) {'client/test.js'}

        context 'stale', :stale do
          it 'returns true' do
            expect(subject.stale?(client_dir: client_dir)).to be_truthy
          end
        end

        context 'not stale', :not_stale do
          it 'returns true' do
            expect(subject.stale?(client_dir: client_dir)).to be_falsey
          end
        end
      end

      context 'with params files list', :params_files_list do
        let(:client_file) {'client/params/test.js'}

        context 'stale', :stale do
          it 'returns true' do
            expect(subject.stale?(client_dir: client_dir, files: [client_file])).to be_truthy
          end
        end

        context 'not stale', :not_stale do
          it 'returns true' do
            expect(subject.stale?(client_dir: client_dir, files: [client_file])).to be_falsey
          end
        end
      end
    end
  end
end