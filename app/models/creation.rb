class Creation < ApplicationRecord
  belongs_to :user
  #has_one :license
  belongs_to :creation_type
  has_and_belongs_to_many :categories, dependent: :destroy
  has_many :creation_territories, dependent: :destroy

  has_many :plagiats, dependent: :destroy
  has_many :creation_owners, dependent: :destroy
  has_many :creation_authors, dependent: :destroy
  has_many :authors, dependent: :destroy

  accepts_nested_attributes_for :authors, allow_destroy: true, reject_if: :all_blank

  scope :texts, -> { where(kind: 'text').where.not(charge_id: nil) }
  scope :arts, -> { where(kind: 'art').where.not(charge_id: nil) }
  scope :digitals, -> { where(kind: 'digital').where.not(charge_id: nil) }

  scope :texts_to_upload, -> { where(kind: 'text').where(scanned_document_id: nil).where(registered_state: 'registered') }
  scope :images, -> { where(kind: 'image').where(registered_state: 'registered') }

  has_attached_file :image
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
  validates_attachment_size :image, :less_than_or_equal_to => 1000.megabytes

  has_attached_file :qr_code
  validates_attachment_content_type :qr_code, content_type: /\Aimage\/.*\z/

  has_attached_file :video, :styles => {
    :medium => { :geometry => "640x480", :format => 'flv' },
    :thumb => { :geometry => "100x100#", :format => 'jpg', :time => 10 }
  }, :processors => [:transcoder]
  validates_attachment_content_type :video, content_type: /\Avideo\/.*\Z/
  validates_attachment_size :video, :less_than_or_equal_to => 1000.megabytes

  has_attached_file :audio
  validates_attachment_content_type :audio, content_type: /\Aaudio\/.*\Z/
  validates_attachment_size :audio, :less_than_or_equal_to => 1000.megabytes
  has_attached_file :document
  validates_attachment_content_type :document, content_type: /\Aapplication\/(pdf|zip|vnd.ms-powerpoint|vnd.openxmlformats-officedocument)\z/
  validates_attachment_size :document, :less_than_or_equal_to => 1000.megabytes

  # has_attached_file :proof_of_invention
  # validates_attachment_content_type :proof_of_invention, content_type: /\Aapplication\/(pdf|zip|vnd.ms-powerpoint|vnd.openxmlformats-officedocument)\z/
  # validates_attachment_size :proof_of_invention, :less_than_or_equal_to => 1000.megabytes

  has_attached_file :virtual_object
  validates_attachment_size :virtual_object, :less_than_or_equal_to => 1000.megabytes

  def isText?
    'text' == self.kind
  end

  def generate_order_number
    "AY-#{SecureRandom.hex(5)}#{self.id}".upcase
  end

  def pdf_owners
    creation_owners.map {|owner| "<strong>#{owner.first_name} #{owner.last_name}(#{owner.mail})</strong>"}.join(', ')
  end

  def pdf_authors
    creation_authors.map {|author| "<strong>#{author.first_name} #{author.last_name}(#{author.mail})</strong>"}.join(', ')
  end
end
