import React, { useState } from 'react';

const Generator = ({ setLayouts }) => {
  const [layoutName, setLayoutName] = useState('');
  const [rightSide, setRightSide] = useState({ seatsPerRow: 0, rows: 0 });
  const [leftSide, setLeftSide] = useState({ seatsPerRow: 0, rows: 0 });
  const [backSeat, setBackSeat] = useState({ seats: 0 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/layouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ layoutName, rightSide, leftSide, backSeat })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLayouts(prevLayouts => [...prevLayouts, data]);
    } catch (error) {
      console.error('Failed to generate layout:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Layout Name:</label>
        <input type="text" value={layoutName} onChange={(e) => setLayoutName(e.target.value)} required />
      </div>
      <div>
        <h3>Right Side</h3>
        <label>Seats per Row:</label>
        <input type="number" value={rightSide.seatsPerRow} onChange={(e) => setRightSide({ ...rightSide, seatsPerRow: parseInt(e.target.value) })} required />
        <label>Rows:</label>
        <input type="number" value={rightSide.rows} onChange={(e) => setRightSide({ ...rightSide, rows: parseInt(e.target.value) })} required />
      </div>
      <div>
        <h3>Left Side</h3>
        <label>Seats per Row:</label>
        <input type="number" value={leftSide.seatsPerRow} onChange={(e) => setLeftSide({ ...leftSide, seatsPerRow: parseInt(e.target.value) })} required />
        <label>Rows:</label>
        <input type="number" value={leftSide.rows} onChange={(e) => setLeftSide({ ...leftSide, rows: parseInt(e.target.value) })} required />
      </div>
      <div>
        <h3>Back Seat</h3>
        <label>Seats:</label>
        <input type="number" value={backSeat.seats} onChange={(e) => setBackSeat({ seats: parseInt(e.target.value) })} required />
      </div>
      <button type="submit">Generate Layout</button>
    </form>
  );
};

export default Generator;