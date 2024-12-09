import React, { useState } from 'react';
import { createRoute } from '../api/routes';

const RouteForm = ({ token }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRoute({ from, to }, token);
      setFrom('');
      setTo('');
      setError('');
    } catch (error) {
      console.error('Failed to create route', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>From:</label>
        <input type="text" value={from} onChange={(e) => setFrom(e.target.value)} required />
      </div>
      <div>
        <label>To:</label>
        <input type="text" value={to} onChange={(e) => setTo(e.target.value)} required />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Create Route</button>
    </form>
  );
};

export default RouteForm;