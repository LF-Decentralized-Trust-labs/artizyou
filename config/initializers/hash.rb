class Hash

  def camelize_keys
    camelized_hash = {}

    formatted_hash = self.stringify_keys

    formatted_hash.keys.each do |key|
      camelized_hash[key.camelize(:lower)] = formatted_hash[key]
    end

    camelized_hash.symbolize_keys
  end

  def underscore_keys
    underscored_hash = {}

    formatted_hash = self.stringify_keys

    formatted_hash.keys.each do |key|
      underscored_hash[key.underscore] = formatted_hash[key]
    end

    underscored_hash.symbolize_keys
  end
end