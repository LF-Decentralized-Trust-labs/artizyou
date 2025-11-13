class QrCodeGenerator
  attr_reader :content
  def initialize(content)
    @content = content
  end

  def generate_qrcode
    tempfile
  end

  def qr_code_image
    qrcode = RQRCode::QRCode.new(content)
    qrcode.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      module_size: 6,
      standalone: true
    )
  end

  def tempfile
    file = Tempfile.new(['TempFile', '.svg'])
    file.binmode
    file.write qr_code_image
    file.rewind
    file
  end
end
