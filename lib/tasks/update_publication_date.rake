require 'date'
namespace :update_publication_date do
    desc "update publication dates for existing creations"
    task creation_publication_date: :environment do
      Creation.all.each do |creation|
        if !creation.publication_year.nil? && creation.publication_year > 0
          puts 'updating publication date of creations'
          creation.update(publication_date: DateTime.new(creation.publication_year, 1, 1)) if creation.publication_date.nil?
        else
          puts 'Publication year value not available'
        end
      end
    end
  
  end
  