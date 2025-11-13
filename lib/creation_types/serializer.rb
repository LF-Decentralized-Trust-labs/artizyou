module CreationTypes
  class Serializer
    def self.serialize(type)
      attributes_to_dump = ['code', 'file_type', 'id', 'kind', 'name_en', 'name_fr', 'new_feature_expiry_date']
      serialized_creation_type = type.attributes.extract!(*attributes_to_dump)
      serialized_creation_type[:code] = type.code.downcase
      serialized_creation_type[:licenses] = type.licenses.map(&:code)
      serialized_creation_type.camelize_keys
    end
  end
end