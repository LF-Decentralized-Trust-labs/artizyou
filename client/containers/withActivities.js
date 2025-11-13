import {toList} from 'fungo';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({activities, user}) => {
  const {data} = activities;
  const {language} = user;

  const myList = toList(data).filter(({locale}) => locale === language);

  return {
    activitiesData: data,
    activityList: myList,
  };
};


const withActivities = (WrappedComponent) => {
  const Component = (props) => {

    return <WrappedComponent {...props}/>;
  };

  return connect(mapStateToProps)(Component);
};

export default withActivities;