# unless Rails.env.test?
#   s3 = Aws::S3::Resource.new()
#   BUCKET = s3.bucket("artizyou#{'-staging' unless Rails.env.production?}")
# end
