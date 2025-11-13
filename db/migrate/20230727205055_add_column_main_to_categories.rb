class AddColumnMainToCategories < ActiveRecord::Migration[5.1]
  def change
    add_column :categories, :main, :boolean, default: false
    if column_exists?(:categories, :main)
      Category.where(name_en: ['Technology', 'Art & culture activity', 'Profession and managerial', 'Education']).update(main: true)
    end
  end
end
