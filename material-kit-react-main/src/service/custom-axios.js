import axios from 'axios';
// import { useEffect, useState } from 'react';

// Customize the axos for don't have to write it down the local and .date to much
// const [accessToken, setAccessToken] = useState('');

// useEffect(() => {
//   const accessToken = localStorage.getItem('accessToken');

//   if (accessToken) {
//     setAccessToken(accessToken);
//   }
// }, []);
const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});
// Add a response interceptor
instance.interceptors.response.use(
  (response) => (response.data ? response.data : { statusCode: response.status }),
  (error) => Promise.reject(error)
);
export default instance;
