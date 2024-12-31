import axios from 'axios';

const API_URL = 'http://54.242.171.0/api/routes';

export const createRoute = async (routeData, token) => {
  const response = await axios.post(API_URL, routeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const getRoutes = async (token) => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};