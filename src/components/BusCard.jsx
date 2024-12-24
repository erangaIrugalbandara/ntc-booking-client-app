import React from 'react';
import './BusCard.css';

const BusCard = ({ bus }) => {
  const calculateDuration = (departureTime, arrivalTime) => {
    const departure = new Date(`1970-01-01T${departureTime}:00`);
    const arrival = new Date(`1970-01-01T${arrivalTime}:00`);
    const duration = (arrival - departure) / (1000 * 60 * 60); // Convert milliseconds to hours
    return duration;
  };

  const departureCity = bus.direction ? bus.from : bus.to;
  const arrivalCity = bus.direction ? bus.to : bus.from;

  return (
    <div className="bus-card">
      <h3>{bus.registrationNumber}</h3>
      <p>Date: {bus.date}</p>
      <div className="bus-details">
        <div>
          <p>Departure City: {departureCity}</p>
          <p>Departure Time: {bus.departureTime}</p>
        </div>
        <div>
          <p>Arrival City: {arrivalCity}</p>
          <p>Arrival Time: {bus.arrivalTime}</p>
        </div>
        <div>
          <p>Duration: {calculateDuration(bus.departureTime, bus.arrivalTime)} hours</p>
        </div>
      </div>
      <button>Book Seat</button>
    </div>
  );
};

export default BusCard;