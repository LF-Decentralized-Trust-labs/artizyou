module NewCreationHelper

  def choose_license
    find('div.license', text: 'License 1').click
    find('#creation-save-license').click
  end

  def create_categories
    (1..4).each {|index| create(:category, name_en: "Category #{index}")}
  end

  def create_licenses
    (1..4).each {|index| create(:license, name: "License #{index}")}
  end

  def create_creation_types
    types = [
        {
            kind: 'image', name_fr: 'Illustration', name_en: 'Illustration', code: 'PICTURE', file_type: 'image'
        },
        {
            kind: 'text', name_fr: 'Livre', name_en: 'Book', code: 'BOOK', file_type: 'pdf'
        },
        {
            kind: 'art', name_fr: 'Sculpture', name_en: 'Sculpture', code: 'SCULPTURE', file_type: 'image'
        }
    ]
    (1..3).each {|index| create(:creation_type, types[index])}
  end

  def select_type(type)
    find("#type-#{type}").click
    find('#creation-save-license').click
  end

  def fill_infos
    fill_in('name', with: 'creation name')
    fill_in('description', with: 'creation description')
    react_select('#creation-year', '2018')
    fill_in('materials', with: 'creation materials')
    drop_file('image', 'test-image.png')
    find('div.category', text: 'Category 1').trigger('click')
    find("#creationAcceptedTerms").click

    find('#creation-save-infos').click
  end

  def select_kind(kind)
    find("#kind-#{kind}").click
  end
end