import { toList } from "fungo";
import React from "react";
import { connect } from "react-redux";

const mapStateToProps = ({ user, creations }) => {
  const { data } = creations;

  return {
    creations: toList(data),
    user: user,
  };
};

const withCreations = (WrappedComponent) => {
  const Component = (props) => {
    return <WrappedComponent {...props} />;
  };

  return connect(mapStateToProps)(Component);
};

export default withCreations;
