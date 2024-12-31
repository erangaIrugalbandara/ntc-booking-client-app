import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SeatLayout from './SeatLayout';
import { w3cwebsocket as W3CWebSocket } from 'websocket';

const client = new W3CWebSocket('ws://localhost:5000');

const Booking = ({ bus, schedule, userId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState(schedule.bookedSeats);
  const [message, setMessage] = useState('');

  useEffect(() => {
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.busId === bus._id && data.scheduleDate === schedule.date) {
        setBookedSeats(data.seats);
      }
    };
  }, [bus._id, schedule.date]);

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
  };

  const handleCheckout = async (paymentMethod) => {
    if (paymentMethod === 'payLater') {
      try {
        const response = await axios.post('http://54.242.171.0/api/bookings', {
          busId: bus._id,
          scheduleDate: schedule.date,
          seats: selectedSeats,
          userId: userId
        });

        setMessage(response.data.message);
      } catch (error) {
        setMessage('Error booking seats.');
      }
    } else {
      setMessage('Payment integration coming soon.');
    }
  };

  return (
    <div className="booking">
      <SeatLayout
        layout={schedule.layout}
        bookedSeats={bookedSeats}
        onSeatSelect={handleSeatSelect}
      />
      <div className="checkout">
        <button onClick={() => handleCheckout('payNow')}>Pay Now</button>
        <button onClick={() => handleCheckout('payLater')}>Pay Later</button>
      </div>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Booking;