import React, { useState, useEffect } from 'react';

const SeatBookingPage = ({ token }) => {
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [date, setDate] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Search:', { fromCity, toCity, date });
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
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SeatBookingPage;