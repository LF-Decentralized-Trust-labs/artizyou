namespace :qr_code do
  include Rails.application.routes.url_helpers
  default_url_options[:host] = 'https://app.artizyou.com'
  desc "TODO"
  task update: :environment do
    Creation.all.each do |creation|
      unless creation.qr_code.present?
        creation.qr_code = QrCodeGenerator.new(scan_creation_url(creation, date: creation.created_at)).generate_qrcode
        creation.save
      end
    end
  end

end
