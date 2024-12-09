import axios from 'axios';

const API_URL = 'http://localhost:5000/api/buses';

export const addSchedule = async (busId, schedules, token) => {
  const response = await axios.post(`${API_URL}/${busId}/schedules`, { schedules }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};