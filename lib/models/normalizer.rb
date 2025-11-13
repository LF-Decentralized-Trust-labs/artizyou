module Models
  class Normalizer
    class << self

      def normalize(data, key = :id)
        normalized_data = {data: {}}

        data.each do |item|
          normalized_data[:data][item[key]] = (block_given? ? yield(item) : item.attributes.camelize_keys)
        end

        normalized_data
      end
    end
  end
end