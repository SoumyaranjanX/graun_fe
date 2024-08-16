import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
});

export const fetchNotifications = async () => {
  const response = await api.get('/notifications');
  return response.data;
};
