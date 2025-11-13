ActiveRecord::Base.transaction do
  Role.find_or_create_by( name: "super_admin" )

  user = User.new(
    email: ENV['SEED_ADMIN_EMAIL'] || 'artizyou@fungo.ca',
    password: ENV['SEED_ADMIN_PASSWORD'] || 'texmex18',
    first_name: ENV['SEED_ADMIN_FIRST_NAME'] || 'Art',
    last_name: ENV['SEED_ADMIN_LAST_NAME'] || 'Izyou'
  )
  user.skip_confirmation!
  user.add_role(:super_admin)
  user.save

  activity_sectors_language_list = [
      ["fr", "language", 0, "fr", "Français"],
      ["fr", "language", 0, "en", "French"],
      ["en", "language", 0, "fr", "Anglais"],
      ["en", "language", 0, "en", "English"],
      ["administration", "activity", 0, "fr", "Administration"],
      ["administration", "activity", 0, "en", "Administration"],
      ["agriculture", "activity", 0, "fr", "Agriculture"],
      ["agriculture", "activity", 0, "en", "Agriculture"],
      ["architecture et design", "activity", 0, "fr", "Architecture et Design"],
      ["architecture et design", "activity", 0, "en", "Architecture and Design"],
      ["arts, spectacles et loisirs", "activity", 0, "fr", "Arts, spectacles et loisirs"],
      ["arts, spectacles et loisirs", "activity", 0, "en", "Arts, entertainment and recreation"],
      ["autres services", "activity", 0, "fr", "Autres services (sauf les administrations publiques)"],
      ["autres services", "activity", 0, "en", "Other services (except public administration)"],
      ["beauté", "activity", 0, "fr", "Beauté"],
      ["beauté", "activity", 0, "en", "Beauty"],
      ["fabrication", "activity", 0, "fr", "Fabrication"],
      ["fabrication", "activity", 0, "en", "Manufacturing"],
      ["finance et assurances", "activity", 0, "fr", "Finance et assurances"],
      ["finance et assurances", "activity", 0, "en", "Finance and Insurance"],
      ["gestion de sociétés", "activity", 0, "fr", "Gestion de sociétés et d’entreprises"],
      ["gestion de sociétés", "activity", 0, "en", "Management of companies"],
      ["hébergement et restauration", "activity", 0, "fr", "Hébergement et services de restauration"],
      ["hébergement et restauration", "activity", 0, "en", "Accommodation and catering services"],
      ["industrie de l’information", "activity", 0, "fr", "Industrie de l’information"],
      ["industrie de l’information", "activity", 0, "en", "Information Industry"],
      ["industrie culturelle", "activity", 0, "fr", "Industrie culturelle"],
      ["industrie culturelle", "activity", 0, "en", "Cultural industry"],
      ["services administratifs, soutien, gestion", "activity", 0, "fr", "Services administratifs, services de soutien, services de gestion des déchets et services d’assainissement"],
      ["services administratifs, soutien, gestion", "activity", 0, "en", "Administrative Services, Support Services, Waste Management and Remediation Services"],
      ["services d’enseignement", "activity", 0, "fr", "Services d’enseignement"],
      ["services d’enseignement", "activity", 0, "en", "Educational Services"],
      ["services de restauration", "activity", 0, "fr", "Services de restauration"],
      ["services de restauration", "activity", 0, "en", "Catering services"],
      ["services immobiliers", "activity", 0, "fr", "Services immobiliers"],
      ["services immobiliers", "activity", 0, "en", "Real estate services"],
      ["services professionnels, scientifiques, techniques", "activity", 0, "fr", "Services professionnels, scientifiques et techniques"],
      ["services professionnels, scientifiques, techniques", "activity", 0, "en", "Professional, Scientific and Technical Services"],
      ["soins de santé ", "activity", 0, "fr", "Soins de santé "],
      ["soins de santé", "activity", 0, "en", "Health care"],
      ["transport et entreposage", "activity", 0, "fr", "Transport et entreposage"],
      ["transport et entreposage", "activity", 0, "en", "Transportation and warehousing"]
  ]

  activity_sectors_language_list.each do |value, domain, status, locale, description|
    DomainValue.find_or_create_by( value: value, domain: domain, status: status, locale: locale, description: description )
  end

  Category.find_or_create_by(name_fr: "Technologie", name_en: "Technology", main: true)
  Category.find_or_create_by(name_fr: "Art et culture", name_en: "Art & culture activity", main: true)
  Category.find_or_create_by(name_fr: "Profession et management", name_en: "Profession and managerial", main: true)
  Category.find_or_create_by(name_fr: "Éducation", name_en: "Education", main: true)

  copyright_license = License.find_or_create_by(name: "Droit d'auteur", code: "CR")
  trademark_license = License.find_or_create_by(name: "Marque de commerce", code: "TM")

  CreationType.find_or_create_by(kind: 'image', name_fr: 'Photographie', name_en: 'Picture', code: 'PICTURE', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: 'Photographie').id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: 'Logo', name_en: 'Logo', code: 'LOGO', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: 'Logo').id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: 'Illustration', name_en: 'Illustration', code: 'ILLUSTRATION', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: 'Illustration').id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: "Design Graphique", name_en: 'Graphic design', code: 'GRAPHIC', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: 'Design Graphique').id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: "Maquette d'un site web", name_en: 'Website', code: 'WEBSITE', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: "Maquette d'un site web").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: "Toile", name_en: 'Canvas', code: 'CANVAS', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: "Toile").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: "Dessin industriel", name_en: 'Industrial design', code: 'INDUSTRIAL', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: "Dessin industriel").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'image', name_fr: "Idée, Invention, Innovation", name_en: 'Idea, Invention, Innovation', code: 'IDEA_IMAGE', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'image', name_fr: "Idée, Invention, Innovation").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'text', name_fr: "Livre", name_en: 'Book', code: 'BOOK', file_type: 'pdf')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'text', name_fr: "Livre").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'text', name_fr: "Article ou blogue", name_en: 'Article or blog', code: 'ARTICLE', file_type: 'pdf')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'text', name_fr: "Article ou blogue").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'text', name_fr: "Nom commercial", name_en: 'Trade name', code: 'TRADE', file_type: 'pdf')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'text', name_fr: "Nom commercial").id, license_id: trademark_license.id)

  CreationType.find_or_create_by(kind: 'text', name_fr: "PowerPoint", name_en: 'PowerPoint', code: 'PP_TEXT', file_type: 'zip_ppt')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'text', name_fr: "PowerPoint").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'text', name_fr: "Idée, Invention, Innovation", name_en: 'Idea, Invention, Innovation', code: 'IDEA_TEXT', file_type: 'pdf')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'text', name_fr: "Idée, Invention, Innovation").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'art', name_fr: "Objet (moins de 50 exemplaires)", name_en: 'Object (less than 50 copies)', code: 'OBJECT', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'art', name_fr: "Objet (moins de 50 exemplaires)").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'art', name_fr: "Sculpture", name_en: 'Sculpture', code: 'SCULPTURE', file_type: 'image')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'art', name_fr: "Sculpture").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Code source", name_en: 'Source code', code: 'CODE', file_type: 'zip')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Code source").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Algorithme", name_en: 'Algorithm', code: 'ALGORITHM', file_type: 'zip')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Algorithme").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Objet virtuel", name_en: 'Virtual object', code: 'VOBJECT', file_type: 'any')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Objet virtuel").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Présentation/Pitch", name_en: 'Presentation/Pitch	', code: 'PP_DIGITAL', file_type: 'zip_ppt')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Présentation/Pitch").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Vidéo", name_en: 'Video', code: 'VV_DIGITAL', file_type: 'video')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Vidéo").id, license_id: copyright_license.id)

  CreationType.find_or_create_by(kind: 'digital', name_fr: "Musique", name_en: "Music", code: 'MM_DIGITAL', file_type: 'audio')
  CreationTypesLicense.find_or_create_by(creation_type_id: CreationType.find_by(kind: 'digital', name_fr: "Musique").id, license_id: copyright_license.id)
end