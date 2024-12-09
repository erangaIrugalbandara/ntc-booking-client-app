import React from 'react';
import RouteForm from '../components/RouteForm';

const RoutesPage = ({ token }) => {
  return (
    <div>
      <h1>Routes</h1>
      <RouteForm token={token} />
    </div>
  );
};

export default RoutesPage;