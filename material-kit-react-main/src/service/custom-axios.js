import axios from 'axios';
import { accessToken } from '../sections/auth/login/LoginForm'; // Đường dẫn tới file token.js

const token = localStorage.getItem('accessToken');

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: token ? `Bearer ${token}` : `Bearer ${accessToken}`,
  },
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => (response.data ? response.data : { statusCode: response.status }),
  (error) => Promise.reject(error)
);
export default instance;
