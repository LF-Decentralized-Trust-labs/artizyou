class CountDownsController < ApplicationController
  def show
    # note to self: add security to this header
    headers['Access-Control-Allow-Origin'] = '*'
    render json: { countdown: CountDownTimer.last }, status: :ok
  end
end
