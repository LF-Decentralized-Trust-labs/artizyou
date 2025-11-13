import { createCreationParams } from "./creation";
import { createFormData, get, post, put } from "fungo";

export const setCreationCategories =
  (creationId) => (dispatch) => (categories) => {
    dispatch({
      type: "SET_CREATION_FIELD",
      creationId,
      name: "categories",
      value: categories,
    });
  };

export const setCreationField = (creationId, name, value) => ({
  type: "SET_CREATION_FIELD",
  creationId,
  name,
  value,
});

export const resetCreations = () => (dispatch) => {
  dispatch({
    type: "RESET_CREATIONS_TO_PREVIOUS_STATE",
  });
};

export const takeSnapshotOfCreations = () => (dispatch) => {
  dispatch({
    type: "SNAPSHOT_CREATIONS",
  });
};

export const saveCategories = (creation) => async (dispatch) => {
  const { categories, otherCategory } = creation;

  const params = {
    categories,
    otherCategory,
  };

  try {
    const response = await put(
      "/creations/" + creation.creationId,
      createCreationParams(params),
      dispatch
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateAuthors = async (authors, creationId) => {
  const params = {
    authors,
    owners: [],
    operatingTerritories: [],
    publishedTerritories: [],
    categories: [],
  };
  try {
    const response = await put(
      `/creations/${creationId}/update_authors_owners`,
      createCreationParams(params)
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const deleteAuthor = async (authorId, creationId) => {
  try {
    const response = await put(
      `/creations/${creationId}/delete_author/${authorId}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const excludePlagiarism = async (creationId, plagiarismId) => {
  try {
    const response = await put(
      `/creations/${creationId}/exclude_plagiarism_detection/${plagiarismId}`
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const plagiats = (creationId, errorCallback = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await get(
        `/creations/${creationId}/plagiats.json`,
        dispatch
      );
      return await response.json();
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };
};

export const payCreation =
  (
    creationId,
    token,
    paymentTerms,
    card_id,
    amount,
    currency,
    paymentIntentId
  ) =>
  async (dispatch) => {
    try {
      if (token) {
        const response = await post(
          `/creations/${creationId}/pay`,
          createFormData({
            token,
            paymentTerms,
            amount,
            currency,
            payment_intent_id: paymentIntentId,
          }),
          dispatch
        );

        const responseObj = await response.json();
        dispatch(
          setCreationField(creationId, "chargeId", responseObj.chargeId)
        );
        dispatch(
          setCreationField(creationId, "paymentTerms", responseObj.paymentTerms)
        );

        return responseObj;
      } else {
        const response = await post(
          `/creations/${creationId}/pay`,
          createFormData({
            card_id,
            paymentTerms,
            amount,
            currency,
            payment_intent_id: paymentIntentId,
          }),
          dispatch
        );

        const responseObj = await response.json();
        dispatch(
          setCreationField(creationId, "chargeId", responseObj.chargeId)
        );
        dispatch(
          setCreationField(creationId, "paymentTerms", responseObj.paymentTerms)
        );

        return responseObj;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const createPaymentIntent =
  (token, paymentTerms, card_id, amount, currency, last_four_digit = "") =>
  async (dispatch) => {
    try {
      if (token) {
        const response = await post(
          `/creations/payment_intent`,
          createFormData({
            token,
            paymentTerms,
            amount,
            currency,
            last_four_digit,
          }),
          dispatch
        );
        const responseObj = await response.json();
        return responseObj;
      } else {
        const response = await post(
          `/creations/payment_intent`,
          createFormData({
            card_id,
            paymentTerms,
            amount,
            currency,
            last_four_digit,
          }),
          dispatch
        );

        const responseObj = await response.json();
        return responseObj;
      }
    } catch (error) {
      console.log(error);
    }
  };

export const registerCreation = (creationId) => async (dispatch) => {
  try {
    const response = await post(
      `/creations/${creationId}/register`,
      {},
      dispatch
    );

    const responseObj = await response.json();

    //dispatch(setCreationField(creationId, 'txHash', responseObj.txHash));
    dispatch({
      type: "REFRESH_CREATION",
      creation: responseObj.creation,
    });

    return responseObj;
  } catch (error) {
    console.log(error);
  }
};
