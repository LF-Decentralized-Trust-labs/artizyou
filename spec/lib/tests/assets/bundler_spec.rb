require 'rails_helper'
require 'tests/assets/bundler'

RSpec.describe Tests::Assets::Bundler, type: :lib do
  subject {Tests::Assets::Bundler}

  context '.generate' do
    let(:error) {'Could not bundle files'}
    let(:stdout) {'bundle'}
    let(:stderr) {'error'}

    before(:each, :completing_command) {
      expect(subject).to receive(:puts).with("\nBundling assets")
      expect(subject).to receive(:puts).with("\nRunning : #{cmd}")
      expect(Open3).to receive(:capture3).with(cmd).and_return([stdout, stderr, status])
    }

    before(:each, :success) {
      expect(subject).to receive(:puts).with("\nDone bundling")
      expect(subject).not_to receive(:puts).with("\n#{stdout}")
      expect(subject).not_to receive(:puts).with("\n#{stderr}")
    }

    before(:each, :failed) {
      expect(subject).not_to receive(:puts).with("\nDone bundling")
      expect(subject).to receive(:puts).with("\n#{stdout}")
      expect(subject).to receive(:puts).with("\n#{stderr}")
    }

    before(:each, :error) {
      expect(subject).to receive(:puts).with("\nBundling assets")
      expect(subject).to receive(:puts).with("\nRunning : #{cmd}")
      expect(Open3).to receive(:capture3).with(cmd).and_raise(StandardError, error)
      expect(subject).to receive(:puts).with("\nError while bundling assets.")
      expect(subject).to receive(:puts).with("\n#{error}")
    }

    context 'with default command' do
      let(:cmd) {'cd client && yarn build:test'}

      context 'success', :completing_command, :success do
        let(:status) {double('status', success?: true)}

        it 'generates the test bundle' do
          subject.generate
        end
      end

      context 'failed', :completing_command, :failed do
        let(:status) {double('status', success?: false)}

        it 'outputs the command error' do
          subject.generate
        end
      end

      context 'error', :error do
        it 'outputs the error' do
          subject.generate
        end
      end
    end

    context 'with command in params' do
      let(:cmd) {'cd client && yarn build:test:params'}

      context 'success', :completing_command, :success do
        let(:status) {double('status', success?: true)}

        it 'generates the test bundle' do
          subject.generate(cmd)
        end
      end

      context 'failed', :completing_command, :failed do
        let(:status) {double('status', success?: false)}

        it 'outputs the command error' do
          subject.generate(cmd)
        end
      end

      context 'error', :error do
        it 'outputs the error' do
          subject.generate(cmd)
        end
      end
    end
  end
end