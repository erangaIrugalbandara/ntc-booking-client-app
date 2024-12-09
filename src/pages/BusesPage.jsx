import React from 'react';
import BusForm from '../components/BusForm';

const BusesPage = ({ token }) => {
  return (
    <div>
      <h1>Buses</h1>
      <BusForm token={token} />
    </div>
  );
};

export default BusesPage;