require 'rails_helper'
require 'users/serializer'

RSpec.describe Users::Serializer, type: :lib do
  subject {Users::Serializer}

  context '.serialize' do
    let(:id) {1}
    let(:serialized_user) {
      {
          acceptedTerms: nil,
          activity: 'Painter',
          activityPrecision: nil,
          address: nil,
          state: nil,
          city: 'Quebec',
          completedProfile: true,
          country: 'CA',
          createdAt: nil,
          description: 'Ma description',
          email: 'azicat@fungo.ca',
          facebookUrl: nil,
          firstName: 'Alexandre',
          language: 'en',
          lastName: 'Zicat',
          linkedInUrl: nil,
          onboarding: false,
          personnalWebsite: nil,
          photo: {},
          professionalWebsite: nil,
          twitterUrl: nil,
          updatedAt: nil,
          userId: id,
          username: 'alexzicat',
      }
    }
    let(:user) {build(:user, id: id)}

    it 'serializes the user' do
      expect(subject.serialize(user)).to eq(serialized_user)
    end
  end
end