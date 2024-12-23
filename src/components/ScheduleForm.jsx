import React, { useState, useEffect } from 'react';
import { addSchedule } from '../api/schedules';
import { getBuses } from '../api/buses';

const ScheduleForm = ({ token }) => {
  const [busId, setBusId] = useState('');
  const [schedules, setSchedules] = useState([{ date: '', departureTime: '', arrivalTime: '', direction: true }]);
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const data = await getBuses(token);
        setBuses(data);
      } catch (error) {
        console.error('Failed to fetch buses', error);
      }
    };

    fetchBuses();
  }, [token]);

  const handleScheduleChange = (index, field, value) => {
    const newSchedules = [...schedules];
    newSchedules[index][field] = value;
    setSchedules(newSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { date: '', departureTime: '', arrivalTime: '', direction: true }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addSchedule(busId, schedules, token);
      setSchedules([{ date: '', departureTime: '', arrivalTime: '', direction: true }]);
    } catch (error) {
      console.error('Failed to add schedules', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Bus:</label>
        <select value={busId} onChange={(e) => setBusId(e.target.value)} required>
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.registrationNumber} - {bus.from} to {bus.to}
            </option>
          ))}
        </select>
      </div>
      {schedules.map((schedule, index) => (
        <div key={index}>
          <div>
            <label>Date:</label>
            <input
              type="date"
              value={schedule.date}
              onChange={(e) => handleScheduleChange(index, 'date', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Departure Time:</label>
            <input
              type="time"
              value={schedule.departureTime}
              onChange={(e) => handleScheduleChange(index, 'departureTime', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Arrival Time:</label>
            <input
              type="time"
              value={schedule.arrivalTime}
              onChange={(e) => handleScheduleChange(index, 'arrivalTime', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Direction:</label>
            <select
              value={schedule.direction}
              onChange={(e) => handleScheduleChange(index, 'direction', e.target.value === 'true')}
            >
              <option value="true">A to B</option>
              <option value="false">B to A</option>
            </select>
          </div>
        </div>
      ))}
      <button type="button" onClick={handleAddSchedule}>Add Another Schedule</button>
      <button type="submit">Add Schedules</button>
    </form>
  );
};

export default ScheduleForm;