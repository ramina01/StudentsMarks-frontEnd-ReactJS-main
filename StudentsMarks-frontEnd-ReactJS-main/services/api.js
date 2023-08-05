// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with the actual URL of your Laravel backend
});

export const login = (credentials) => API.post('login', credentials);
export const signup = (userData) => API.post('signup', userData);
