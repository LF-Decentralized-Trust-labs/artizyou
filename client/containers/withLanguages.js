import {toList} from 'fungo';
import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = ({languages, user}) => {
  const {data} = languages;
  const {language} = user;

  const myList = toList(data).filter(({locale}) => locale === language);

  return {
    languagesData: data,
    languageList: myList,
  };
};

const withLanguages = (WrappedComponent) => {
  const Component = (props) => {

    return <WrappedComponent {...props}/>;
  };

  return connect(mapStateToProps)(Component);
};

export default withLanguages;