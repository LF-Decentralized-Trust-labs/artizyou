module FormHelper

  def drop_file(name, file_name)
    attach_file(name, "#{Rails.root}/spec/fixtures/#{file_name}", visible: false)
  end

  def react_select(id, text)
    within(id) do
      find('div.Dropdown-placeholder').click
      find('div.Dropdown-option', text: text).click
    end
  end
end