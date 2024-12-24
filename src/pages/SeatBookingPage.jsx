import React, { useState, useEffect } from 'react';
import BusCard from '../components/BusCard';

const SeatBookingPage = ({ token }) => {
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cities', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setFromCities(data.fromCities);
        setToCities(data.toCities);
      } catch (error) {
        console.error('Failed to fetch cities', error);
      }
    };

    fetchCities();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (fromCity === toCity) {
      setError('From and To cities cannot be the same.');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/buses/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ from: fromCity, to: toCity, date })
      });
      const data = await response.json();
      setBuses(data);
    } catch (error) {
      console.error('Failed to fetch matching buses', error);
    }
  };

  return (
    <div>
      <h1>Seat Booking</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>From:</label>
          <select value={fromCity} onChange={(e) => setFromCity(e.target.value)} required>
            <option value="">Select From City</option>
            {fromCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label>To:</label>
          <select value={toCity} onChange={(e) => setToCity(e.target.value)} required>
            <option value="">Select To City</option>
            {toCities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Search</button>
      </form>
      {buses.length > 0 && (
        <div>
          <h2>Available Buses</h2>
          {buses.map((bus) => (
            <BusCard key={bus._id} bus={bus} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeatBookingPage;