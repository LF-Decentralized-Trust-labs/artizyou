module IpAuthenticationConcern
  extend ActiveSupport::Concern

  included do
    private :authenticate_by_ip
  end

  def authenticate_by_ip
    authorized_ips = ENV['AUTHORIZED_IPS'].split(',')
    head :unauthorized unless authorized_ips.include?(request.remote_ip)
  end
end