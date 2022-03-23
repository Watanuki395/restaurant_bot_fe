import React from 'react';  
import { Navigate, Route } from 'react-router-dom';
import { checkCookie } from '../utils/cookies';

const PrivateRoute = ({ component: Component, ...rest }) => (  
  <Route { ...rest } render={props => (
    checkCookie() !== null ? (
      <Component { ...props } />
    ) : (
      <Navigate to={{
          pathname: '/',
          state: { from: props.location }
        }}
      />
    )
  )} />
);

export default PrivateRoute;