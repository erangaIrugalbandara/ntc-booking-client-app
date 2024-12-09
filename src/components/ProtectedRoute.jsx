import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, token, ...rest }) => {
  return token ? React.cloneElement(Component, { token, ...rest }) : <Navigate to="/" />;
};

export default ProtectedRoute;