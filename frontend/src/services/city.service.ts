import axios from '../api/axios';

export const fetchCities = async () => {
  const response = await axios.get('/cities');
  return response.data;
};
