import React from 'react';
import './ViewLayout.css';

const ViewLayout = ({ layout }) => {
  return (
    <div className="layout">
      <h2>{layout.layoutName}</h2>
      <div className="bus-layout">
        <div className="left-side">
          {layout.leftSeats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                <button key={seatIndex} className="seat">{seat}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="right-side">
          {layout.rightSeats.map((row, rowIndex) => (
            <div key={rowIndex} className="seat-row">
              {row.map((seat, seatIndex) => (
                <button key={seatIndex} className="seat">{seat}</button>
              ))}
            </div>
          ))}
        </div>
        <div className="back-seat">
          {layout.backSeats.map((seat, seatIndex) => (
            <button key={seatIndex} className="seat">{seat}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewLayout;