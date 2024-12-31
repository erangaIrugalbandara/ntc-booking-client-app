import axios from 'axios';

const API_URL = 'http://54.242.171.0/api/buses';

export const addSchedule = async (busId, schedules, token) => {
  const response = await axios.post(`${API_URL}/${busId}/schedules`, { schedules }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};