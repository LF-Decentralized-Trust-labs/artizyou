import {toList} from 'fungo';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({categories}) => {
  const {data} = categories;

  return {
    categoriesData: data,
    categoryList: toList(data),
  };
};

const withCategories = (WrappedComponent) => {
  const Component = (props) => {

    return <WrappedComponent {...props}/>;
  };

  return connect(mapStateToProps)(Component);
};

export default withCategories;