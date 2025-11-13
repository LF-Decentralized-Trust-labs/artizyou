class AddRemainingAttributesToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :facebook_url, :string
    add_column :users, :twitter_url, :string
    add_column :users, :linked_in_url, :string
    add_column :users, :personnal_website, :string
    add_column :users, :professional_website, :string
  end
end
