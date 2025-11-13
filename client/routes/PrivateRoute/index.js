import React from 'react';
import {Route} from 'react-router-dom';

import {withAuth} from './helpers';

const PrivateRoute = ({component: Component, ...remainingProps}) => {
  return (
    <Route {...remainingProps} render={(props) => {
      const ComponentWithAuth = withAuth(Component, {...props, ...remainingProps});

      return <ComponentWithAuth/>;
    }}/>
  );
};

export default PrivateRoute;