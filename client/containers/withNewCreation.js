import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  createCreation,
  resetCreation,
  resetCreationDocument,
  setCreationCategories,
  setCreationDocument,
  setNewCreationField,
  setCreationImage,
  setCreationKind,
  setCreationUsers,
} from "../actions/creation";
import {
  registerCreation,
  payCreation,
  createPaymentIntent,
} from "../actions/creations";

const mapStateToProps = ({ creation, user: { plan } }) => ({
  creation,
  plan,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      createCreation,
      payCreation,
      createPaymentIntent,
      registerCreation,
      resetCreation,
      resetCreationDocument,
      setCreationCategories,
      setCreationUsers,
      setCreationDocument,
      setNewCreationField,
      setCreationImage,
      setCreationKind,
    },
    dispatch
  );

const withNewCreation = (WrappedComponent) => {
  const Component = (props) => <WrappedComponent {...props} />;

  return connect(mapStateToProps, mapDispatchToProps)(Component);
};

export default withNewCreation;
