import React, { useState, useEffect } from 'react';
import './SeatLayout.css';

const SeatLayout = ({ layout, bookedSeats, onSeatSelect }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const handleSeatStateChange = (seatId, state) => {
      const seatElement = document.getElementById(seatId);
      if (seatElement) {
        seatElement.className = `seat ${state}`;
      }
    };

    bookedSeats.forEach(seat => {
      handleSeatStateChange(seat.seatId, seat.seatAvailableState.toLowerCase());
    });
  }, [bookedSeats]);

  const handleSeatClick = (seatId) => {
    const seat = bookedSeats.find(seat => seat.seatId === seatId);
    if (seat && seat.isBooked) return;

    const newSelectedSeats = selectedSeats.includes(seatId)
      ? selectedSeats.filter(seat => seat !== seatId)
      : [...selectedSeats, seatId];

    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  return (
    <div className="seat-layout">
      {layout.map((row, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          {row.map((seat, seatIndex) => {
            const seatId = seat;
            const seatState = bookedSeats.find(s => s.seatId === seatId)?.seatAvailableState.toLowerCase() || 'available';
            const isSelected = selectedSeats.includes(seatId);

            return (
              <div
                key={seatIndex}
                id={seatId}
                className={`seat ${seatState} ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSeatClick(seatId)}
              >
                {seatId}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatLayout;