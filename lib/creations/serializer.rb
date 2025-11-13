module Creations
  class Serializer
    def self.serialize(creation)
      attributes_to_dump = ['paid_without_taxes',
                            'accepted_terms',
                            'author',
                            'charge_id',
                            'creation_type_id',
                            'contract_address',
                            'description',
                            'first_market_use',
                            'kind',
                            'name',
                            'operating_territories',
                            'published_territories',
                            'publication_year',
                            'owner',
                            'date_of_invention',
                            'scanned_document_id',
                            'text_extract',
                            'paid',
                            'taxes',
                            'tx_hash',
                            'year',
                            'registered_state',
                            # 'corresponding_to_customer_number',
                            # 'corresponding_to_firm_orindividual',
                            # 'customer_number',
                            # 'user_address',
                            # 'user_city',
                            # 'user_state',
                            # 'user_zip',
                            # 'user_country',
                            # 'user_phone',
                            # 'email'
                          ]

      serialized_creation = creation.attributes.extract!(*attributes_to_dump)

      serialized_creation[:creationId] = creation.id
      serialized_creation[:categories] = creation.categories.map(&:id)
      serialized_creation[:creation_categories] = creation.categories.map{|c| c.attributes.transform_keys { |key| key.camelize(:lower) }}
      serialized_creation[:other_category] = creation.categories.find_by(main: false) ? creation.categories.find_by(main: false).name_en : ''
      serialized_creation[:operatingTerritories] = creation.creation_territories.map(&:country_code)

      if ('text' === creation.kind)
        # serialized_creation[:plagiat_count] = creation.plagiats.last ? creation.plagiats.last.sources : 0
        serialized_creation[:plagiat_count] = creation.plagiats.where("score > ?", 50).where(excluded: false).size
      else
        serialized_creation[:plagiat_count] = creation.plagiats.size
      end

      serialized_creation[:image] = creation.image.expiring_url(86400) if creation.image.present?
      serialized_creation[:document] = creation.document.expiring_url(86400) if creation.document.present?
      serialized_creation[:video] = creation.video.expiring_url(86400) if creation.video.present?
      serialized_creation[:audio] = creation.audio.expiring_url(86400) if creation.audio.present?
      # serialized_creation[:proof_of_invention] = creation.proof_of_invention.expiring_url(86400) if creation.proof_of_invention.present?
      serialized_creation[:virtual_object] = creation.virtual_object.expiring_url(86400) if creation.virtual_object.present?
      serialized_creation[:creationDate] = creation.creation_date
      serialized_creation[:creation_authors] = creation.creation_authors
      serialized_creation[:creation_owners] = creation.creation_owners

      serialized_creation.camelize_keys
    end
  end
end
