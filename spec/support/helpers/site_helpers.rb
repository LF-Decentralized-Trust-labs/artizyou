module SiteHelpers
  def setup_domain_values
    DomainValue.create(domain: 'activity', value: 'Musician', locale: 'en', description: 'Musician')
    DomainValue.create(domain: 'activity', value: 'Musician', locale: 'fr', description: 'Musicien')
    DomainValue.create(domain: 'activity', value: 'Painter', locale: 'en', description: 'Painter')
    DomainValue.create(domain: 'activity', value: 'Painter', locale: 'fr', description: 'Peintre')
    DomainValue.create(domain: 'language', value: 'en', locale: 'en', description: 'English')
    DomainValue.create(domain: 'language', value: 'en', locale: 'fr', description: 'Anglais')
    DomainValue.create(domain: 'language', value: 'fr', locale: 'en', description: 'French')
    DomainValue.create(domain: 'language', value: 'fr', locale: 'fr', description: 'Français')
  end
end