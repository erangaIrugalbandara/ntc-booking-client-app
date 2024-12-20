import React, { useState, useEffect } from 'react';
import { addBus } from '../api/buses';
import { getRoutes } from '../api/routes';
import { getLayouts } from '../api/layouts'; 

const BusForm = ({ token }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [layout, setLayout] = useState(''); 
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [routes, setRoutes] = useState([]);
  const [layouts, setLayouts] = useState([]); 

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const data = await getRoutes(token);
        setRoutes(data);
      } catch (error) {
        console.error('Failed to fetch routes', error);
      }
    };

    const fetchLayouts = async () => {
      try {
        const data = await getLayouts(token);
        setLayouts(data);
      } catch (error) {
        console.error('Failed to fetch layouts', error);
      }
    };

    fetchRoutes();
    fetchLayouts();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBus({ registrationNumber, from, to, layout, firstName, lastName, email, password }, token);
      setRegistrationNumber('');
      setFrom('');
      setTo('');
      setLayout(''); // Reset layout
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Failed to add bus', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Registration Number:</label>
        <input type="text" value={registrationNumber} onChange={(e) => setRegistrationNumber(e.target.value)} required />
      </div>
      <div>
        <label>Route:</label>
        <select value={`${from}-${to}`} onChange={(e) => {
          const [from, to] = e.target.value.split('-');
          setFrom(from);
          setTo(to);
        }} required>
          <option value="">Select Route</option>
          {routes.map((route) => (
            <option key={`${route.from}-${route.to}`} value={`${route.from}-${route.to}`}>
              {route.from} to {route.to}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Layout:</label>
        <select value={layout} onChange={(e) => setLayout(e.target.value)} required>
          <option value="">Select Layout</option>
          {layouts.map((layout) => (
            <option key={layout._id} value={layout._id}>
              {layout.layoutName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Add Bus</button>
    </form>
  );
};

export default BusForm;