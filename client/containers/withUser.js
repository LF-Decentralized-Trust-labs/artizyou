import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  signOut,
  setUserField,
  updateUser,
  refreshUser,
  verifyUsername,
  setUserPhoto,
  pay,
  createPaymentIntentUser,
} from "../actions/user";

const mapStateToProps = ({ user }) => {
  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      signOut,
      setUserField,
      updateUser,
      refreshUser,
      verifyUsername,
      setUserPhoto,
      pay,
      createPaymentIntentUser,
    },
    dispatch
  );
};

const withUser = (WrappedComponent) => {
  const Component = (props) => {
    return <WrappedComponent {...props} />;
  };

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default withUser;
