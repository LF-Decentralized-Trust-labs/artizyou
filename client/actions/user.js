import { createFormData, get, put, destroy, post } from "fungo";
import { setCreationField } from "./creations";

export const setUserField = (name, value) => ({
  type: "SET_USER_FIELD",
  name,
  value,
});

export const updateUser = (params, errorCallback = () => {}) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      const { userId } = user;

      const response = await put(
        `/users/${userId}`,
        createFormData(params),
        dispatch
      );
      const updatedUser = await response.json();

      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };
};

export const refreshUser = (errorCallback = () => {}) => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState();
      const { userId } = user;

      const response = await get(`/users/${userId}`, dispatch);
      const updatedUser = await response.json();

      dispatch({
        type: "SET_USER",
        user: updatedUser,
      });
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };
};

export const verifyUsername = (username, errorCallback = () => {}) => {
  return async (dispatch) => {
    try {
      const response = await get(
        `/users/verify_username/${username}`,
        dispatch
      );
      return await response.json();
    } catch (error) {
      console.log(error);
      errorCallback();
    }
  };
};

export const setUserPhoto =
  ([acceptedFile], [rejectedFile], errorCallback) =>
  (dispatch) => {
    if (acceptedFile) {
      dispatch(setUserField("photo", acceptedFile));
    }

    if (rejectedFile) {
      errorCallback();
    }
  };

export const signOut = () => {
  return async (dispatch) => {
    try {
      await destroy("/users/sign_out", dispatch);
      window.location = "/users/sign_in";
    } catch (error) {
      console.log(error);
    }
  };
};

export const pay =
  (paymentIntentId, paymentTerms) => async (dispatch, getState) => {
    try {
      const { user } = getState();
      const { userId } = user;

      const response = await put(
        `/current_user/pay`,
        createFormData({
          payment_intent_id: paymentIntentId,
          paymentTerms,
        }),
        dispatch
      );

      const responseObj = await response.json();
      return responseObj;
    } catch (error) {
      console.log(error);
    }
  };
export const createPaymentIntentUser =
  (token, paymentTerms, amount, currency, card_id, last_four_digit = "") =>
  async (dispatch) => {
    try {
      if (card_id) {
        const response = await post(
          `/creations/payment_intent`,
          createFormData({
            paymentTerms,
            amount,
            currency,
            card_id,
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
      }
    } catch (error) {
      console.log(error);
    }
  };
