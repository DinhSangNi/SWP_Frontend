import axios from 'axios';

const API = axios.create({
  baseURL: 'https://coursesystem.azurewebsites.net',
  withCredentials: true,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const loginAuth = async (userData) => {
  try {
    const response = await API.post('/Auth/login', userData);
    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const signup = async (userData) => {
  console.log('Sending data to server:', userData);
  const { FullName, username, email, password, phonenumber } = userData;
  try {
    const response = await API.post('/Auth/register', {
      FullName,
      username,
      email,
      password,
      phonenumber,
    });
    console.log('Response from server:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error from server:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};