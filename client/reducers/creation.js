const initialState = {
  acceptedTerms: null,
  author: null,
  paymentTerms: null,
  categories: [],
  completedInfos: false,
  completedLicense: false,
  creationTypeId: null,
  description: null,
  document: {},
  video: {},
  virtual_object: {},
  documentType: {},
  audio: {},
  firstMarketUse: null,
  image: {},
  kind: null,
  materials: null,
  name: null,
  owner: null,
  proof_of_invention: null,
  corresponding_to_customer_number: null,
  corresponding_to_firm_orindividual: null,
  customer_number: null,
  user_address: null,
  user_city: null,
  user_state: null,
  user_zip: null,
  user_country: null,
  user_phone: null,
  email: null,
  operatingTerritories: [],
  publishedTerritories: [],
  publicationYear: null,
  publicationDate: new Date(),
  creationDate: new Date(),
  dateOfInvention: null,
  creationAuthors: [],
  creationOwners: [],
  textExtract: null,
};

const creation = (state = initialState, action) => {
  switch (action.type) {
    case "RESET_CREATION": {
      return initialState;
    }
    case "SET_NEW_CREATION_FIELD": {
      const { name, value } = action;
      return {
        ...state,
        [name]: value,
      };
    }
    case "RESET_DOCUMENT": {
      return {
        ...state,
        document: {},
      };
    }
    default: {
      return state;
    }
  }
};

export default creation;
