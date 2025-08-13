import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Create Axios instance
const axiosClient: AxiosInstance = axios.create({
  baseURL: 'https://officeappsserverdie-topaz.vercel.app', // Replace with backend baseURL
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Add token if available
    // const token = localStorage.getItem("accessToken");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => Promise.reject(error),
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return only the data if you want cleaner API calls
    return response;
  },
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
        // Token refresh logic example:
        // const newAccessToken = await refreshToken();
        // if (newAccessToken) {
        //   error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        //   return axiosClient(error.config);
        // }
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
