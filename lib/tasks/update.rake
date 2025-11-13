namespace :update do
  desc "update authors and owners for existing creations"
  task creation_authors_and_owners: :environment do
    Creation.all.each do |creation|
      if creation.creation_authors.empty? && creation.creation_owners.empty?
        puts 'Adding authors/owners to old creations'
        creation.creation_authors.find_or_create_by(first_name: creation.user.first_name, last_name: creation.user.last_name, mail: creation.user.email)
        creation.creation_owners.find_or_create_by(first_name: creation.user.first_name, last_name: creation.user.last_name, mail: creation.user.email)
      else
        puts 'Already added for creation'
      end
    end
  end

end
