class AddTranslationsToCategories < ActiveRecord::Migration[5.1]
  def change
    rename_column :categories, :name, :name_fr
    add_column :categories, :name_en, :string, :after => :name_fr

    # Category.destroy_all
    # Category.create!(name_fr: "Droits d'auteur", name_en: "Copyright")
    # Category.create!(name_fr: "TI", name_en: "IT")
    # Category.create!(name_fr: "Marque de commerce", name_en: "Trademark")
    # Category.create!(name_fr: "Dessin industriel", name_en: "Industrial design")
  end
end