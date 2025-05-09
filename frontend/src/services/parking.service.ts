import axios from '../api/axios';

export const startParking = async (data: {
  userId: string;
  areaId: string;
}) => {
  const response = await axios.post('/parking/start', data);
  return response.data;
};

export const stopParking = async (parkingId: string) => {
  const response = await axios.post('/parking/stop', { parkingId });
  return response.data;
};

export const getUserParkings = async (email: string) => {
  const response = await axios.get(`/users/${email}/parkings`);
  return response.data;
};
