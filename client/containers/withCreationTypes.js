import {toList} from 'fungo';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({creationTypes}) => {
  const {data} = creationTypes;

  return {
    creationTypesData: data,
    creationTypesList: toList(data),
  };
};

const withCreationTypes = (WrappedComponent) => {
  const Component = (props) => {

    return <WrappedComponent {...props}/>;
  };

  return connect(mapStateToProps)(Component);
};

export default withCreationTypes;