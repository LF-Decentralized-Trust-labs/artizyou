class AddColumnDateOfInventionToCreations < ActiveRecord::Migration[5.1]
  def up
    unless column_exists?(:creations, :date_of_invention)
      add_column :creations, :date_of_invention, :string
    end
    unless column_exists?(:creations, :corresponding_to_customer_number)
      add_column :creations, :corresponding_to_customer_number, :boolean
    end
    unless column_exists?(:creations, :corresponding_to_firm_orindividual)
      add_column :creations, :corresponding_to_firm_orindividual, :boolean
    end
    unless column_exists?(:creations, :customer_number)
      add_column :creations, :customer_number, :string
    end
    unless column_exists?(:creations, :user_address)
      add_column :creations, :user_address, :string
    end
    unless column_exists?(:creations, :user_city)
      add_column :creations, :user_city, :string
    end
    unless column_exists?(:creations, :user_state)
      add_column :creations, :user_state, :string
    end
    unless column_exists?(:creations, :user_zip)
      add_column :creations, :user_zip, :string
    end
    unless column_exists?(:creations, :user_country)
      add_column :creations, :user_country, :string
    end

    unless column_exists?(:creations, :user_phone)
      add_column :creations, :user_phone, :string
    end
    unless column_exists?(:creations, :email)
      add_column :creations, :email, :string
    end
    # add_attachment :creations, :proof_of_invention
  end

  def down
    if column_exists?(:creations, :date_of_invention)
      remove_column :creations, :date_of_invention, :string
    end
    if column_exists?(:creations, :corresponding_to_customer_number)
      remove_column :creations, :corresponding_to_customer_number, :boolean
    end
    if column_exists?(:creations, :corresponding_to_firm_orindividual)
      remove_column :creations, :corresponding_to_firm_orindividual, :boolean
    end
    if column_exists?(:creations, :customer_number)
      remove_column :creations, :customer_number, :string
    end
    if column_exists?(:creations, :user_address)
      remove_column :creations, :user_address, :string
    end
    if column_exists?(:creations, :user_city)
      remove_column :creations, :user_city, :string
    end
    if column_exists?(:creations, :user_state)
      remove_column :creations, :user_state, :string
    end
    if column_exists?(:creations, :user_zip)
      remove_column :creations, :user_zip, :string
    end
    if column_exists?(:creations, :user_country)
      remove_column :creations, :user_country, :string
    end

    if column_exists?(:creations, :user_phone)
      remove_column :creations, :user_phone, :string
    end
    if column_exists?(:creations, :email)
      remove_column :creations, :email, :string
    end
    if column_exists?(:creations, :proof_of_invention_file_name)
      remove_attachment :creations, :proof_of_invention
    end
  end
end
