import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { getData, StorageKeys } from '../utils/storage';
import { resetAndNavigate } from '../utils/navigationRef';
// http://192.168.2.254:5000
// 🔹 Set baseURL based on environment

const BASE_URL = 'https://fresh-cut-backend.vercel.app';

// const BASE_URL = 'http://192.168.0.102:8000';

// Create Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getData(StorageKeys.USER_DATA)?.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async error => {
    if (!error.response) {
      console.error('Network Error: Please check your internet connection.');
      return Promise.reject({
        message: 'Network Error: Please check your internet connection.',
        isNetworkError: true,
      });
    }

    const status = error.response?.status;

    if (status === 401) {
      console.warn('Unauthorized — token may have expired');

      try {
        resetAndNavigate('LoginScreen');
      } catch (refreshError) {
        console.error('Error refreshing token', refreshError);
      }
    }

    if (status && status !== 401) {
      const errorMessage =
        error.response?.data?.msg || 'Something went wrong, please try again.';
      console.error('API Error:', errorMessage);
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
