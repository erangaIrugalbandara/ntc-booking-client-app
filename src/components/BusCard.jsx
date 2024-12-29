import React, { useState } from 'react';
import Booking from '../components/Booking';
import './BusCard.css';

const BusCard = ({ bus, date, userId }) => {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const handleBookSeat = (schedule) => {
    setSelectedSchedule(schedule);
    setShowBooking(true);
  };

  const filteredSchedules = bus.schedules.filter(schedule => schedule.date === date);

  return (
    <div className="bus-card">
      <h3>{bus.registrationNumber}</h3>
      <p>From: {bus.from}</p>
      <p>To: {bus.to}</p>
      {filteredSchedules.map((schedule, index) => (
        <div key={index} className="schedule">
          <p>Date: {schedule.date}</p>
          <p>Departure: {schedule.departureTime}</p>
          <p>Arrival: {schedule.arrivalTime}</p>
          <button onClick={() => handleBookSeat(schedule)}>Book Seat</button>
        </div>
      ))}
      {showBooking && selectedSchedule && (
        <Booking bus={bus} schedule={selectedSchedule} userId={userId} />
      )}
    </div>
  );
};

export default BusCard;