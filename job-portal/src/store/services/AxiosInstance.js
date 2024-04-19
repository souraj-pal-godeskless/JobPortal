import axios from 'axios';
import store from '../store';

const axiosInstance = axios.create({
  baseURL: `http://localhost:3000/`,
});

export default axiosInstance;
