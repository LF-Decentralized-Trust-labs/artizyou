import { createFormData, post } from "fungo";
import categories from "../reducers/categories";
import { toUnderscore } from "../utils/string";

export const createCreation = () => async (dispatch, getState) => {
  const { creation } = getState();
  const {
    authors,
    categories,
    otherCategory,
    description,
    document,
    firstMarketUse,
    image,
    kind,
    creationTypeId,
    materials,
    name,
    video,
    virtual_object,
    audio,
    // proof_of_invention,
    // corresponding_to_customer_number,
    // corresponding_to_firm_orindividual,
    // customer_number,
    // user_address,
    // user_city,
    // user_state,
    // user_zip,
    // user_country,
    // user_phone,
    // email,
    operatingTerritories,
    publishedTerritories,
    publicationYear,
    publicationDate,
    creationDate,
    owners,
    textExtract,
    acceptedTerms,
    dateOfInvention,
  } = creation;

  const params = {
    authors,
    categories,
    otherCategory,
    operatingTerritories,
    publishedTerritories,
    publicationYear,
    publicationDate,
    creationDate,
    description,
    firstMarketUse,
    image,
    kind,
    creationTypeId,
    materials,
    name,
    owners,
    acceptedTerms,
    // proof_of_invention,
    // dateOfInvention,
    // corresponding_to_customer_number,
    // corresponding_to_firm_orindividual,
    // customer_number,
    // user_address,
    // user_city,
    // user_state,
    // user_zip,
    // user_country,
    // user_phone,
    // email,
  };

  if (document && kind === "text") {
    params.document = document;
    params.textExtract = textExtract;
  }

  if (Object.keys(video).length > 0) {
    params.video = video;
  } else if (Object.keys(audio).length > 0) {
    params.audio = audio;
  }

  if (Object.keys(virtual_object).length > 0) {
    params.virtual_object = virtual_object;
  }

  try {
    const response = await post(
      "/creations",
      createCreationParams(params),
      dispatch
    );
    const savedCreation = await response.json();

    dispatch({
      type: "ADD_CREATION",
      creation: savedCreation,
    });

    return savedCreation;
  } catch (error) {
    console.log(error);
  }
};

export const createCreationParams = (params) => {
  const data = {};
  let creationUsers = params.authors;
  if (creationUsers) {
    Array.prototype.push.apply(creationUsers, params.owners);
  }

  Object.keys(params).forEach((key) => {
    if (key !== "categories" || key !== "authors" || key !== "owners") {
      data[`creation[${toUnderscore(key)}]`] = params[key];
    }
  });

  const formData = createFormData(data);

  params.categories.forEach((categoryId) => {
    formData.append(`categories[]`, categoryId);
  });

  if (creationUsers) {
    creationUsers.forEach((user, index) => {
      Object.keys(user).forEach((key) => {
        formData.append(
          `creation[authors_attributes][${index}][${key}]`,
          user[key]
        );
      });
    });
  }

  if (params.operatingTerritories) {
    params.operatingTerritories.forEach((code) => {
      formData.append(`operating_territories[]`, code);
    });
  }

  if (params.publishedTerritories) {
    params.publishedTerritories.forEach((code) => {
      formData.append(`published_territories[]`, code);
    });
  }

  if (!!params.otherCategory) {
    formData.append("other_category", params.otherCategory);
  }

  return formData;
};

export const resetCreation = () => ({
  type: "RESET_CREATION",
});

export const setCreationCategories = (categories) => (dispatch) => {
  dispatch(setNewCreationField("categories", categories));
};

export const setCreationUsers = (type, users) => (dispatch) => {
  if (type == "CreationAuthor") {
    dispatch(setNewCreationField("authors", users));
  } else if (type == "CreationOwner") {
    dispatch(setNewCreationField("owners", users));
  }
};

export const setNewCreationField = (name, value) => ({
  type: "SET_NEW_CREATION_FIELD",
  name,
  value,
});

export const setCreationImage =
  ([acceptedFile], [rejectedFile], errorCallback) =>
  (dispatch) => {
    if (acceptedFile) {
      dispatch(setNewCreationField("image", acceptedFile));
    }

    if (rejectedFile) {
      errorCallback();
    }
  };

export const setCreationDocument =
  ([acceptedFile], [rejectedFile], errorCallback, fieldName) =>
  (dispatch) => {
    if (acceptedFile) {
      dispatch(setNewCreationField(fieldName, acceptedFile));
    }

    if (rejectedFile) {
      errorCallback();
    }
  };

export const setCreationKind = (kind) => (dispatch) => {
  dispatch(setNewCreationField("kind", kind));
};

export const resetCreationDocument = () => ({ type: "RESET_DOCUMENT" });
