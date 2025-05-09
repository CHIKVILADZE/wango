import axios from '../api/axios';
import type { City } from '../types/city.interface';

export const fetchCities = async (): Promise<City[]> => {
  const response = await axios.get('/cities');
  return response.data;
};

