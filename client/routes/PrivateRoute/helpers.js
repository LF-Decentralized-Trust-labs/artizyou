import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({user}) => {
  return {
    user,
  };
};

export const withAuth = (WrappedComponent, props) => {
  const ComponentWithAuth = ({user}) => {
    if (user && user.userId) {
      return <WrappedComponent {...props}/>;
    }

    if (BROWSER) {
      window.location = '/users/sign_in';
    }

    return null;
  };

  return connect(mapStateToProps)(ComponentWithAuth);
};