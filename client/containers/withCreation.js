import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';

import {
  setCreationCategories,
  resetCreations,
  takeSnapshotOfCreations,
  saveCategories,
  plagiats,
  setCreationField,
  registerCreation,
  payCreation,
  createPaymentIntent
} from '../actions/creations';

const mapStateToProps = ({creations}) => {
  const {data} = creations;

  return {
    data,
  };
};

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    setCreationCategories,
    resetCreations,
    takeSnapshotOfCreations,
    saveCategories,
    plagiats,
    registerCreation,
    payCreation,
    createPaymentIntent,
    setCreationField
  }, dispatch)
);

const withCreation = (WrappedComponent) => {
  const Component = ({data, ...remainingProps}) => {
    const {match} = remainingProps;
    const {params} = match;
    const {creationId} = params;
    const {[creationId]: creation} = data;

    return <WrappedComponent creation={creation} {...remainingProps}/>;
  };

  return connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));
};

export default withCreation;
