require 'rails_helper'

RSpec.describe 'PDF' do
  let(:creation_type) {create(:creation_type)}
  let(:user) {create(:user, onboarding: false)}
  let(:creation) {create(:creation, image: File.open("#{Rails.root}/spec/fixtures/test-image.png"), name: 'patate', user: user, registration_date: Time.now, creation_type: creation_type)}

  specify 'with params' do

    data = ApplicationController.new.render_to_string("test_pdf.html", layout: false,
                                                      locals: {creation: creation })

    pdf = WickedPdf.new.pdf_from_string(data, {
        print_media_type: true,
        page_size: 'Letter',
        margin: {top: 0, # default 10 (mm)
                 bottom: 0,
                 left: 0,
                 right: 0}
    })

    pdf_path = Rails.root.join('spec', 'lib', "generated.pdf")
    File.delete(pdf_path) if File.exists?(pdf_path)
    File.open(pdf_path, 'wb') {|file| file << pdf}

    zip_path = Rails.root.join('spec', 'lib', "generated.zip")
    File.delete(zip_path) if File.exists?(zip_path)
    Zip::Archive.open(zip_path.to_s, Zip::CREATE) do |ar|
      ar.add_file(pdf_path.to_s) # add file to zip archive
    end

    Zip::Archive.encrypt(zip_path.to_s, 'foo')
  end
end
