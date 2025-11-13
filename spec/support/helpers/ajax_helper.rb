module AjaxHelper

  def wait_until(&block)
    Timeout.timeout(Capybara.default_max_wait_time) do
      sleep(0.1) until value = block.call

      value
    end
  end
end