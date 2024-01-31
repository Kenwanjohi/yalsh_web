import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

interface ResponseInterceptor {
  (response: AxiosResponse): AxiosResponse;
}

interface ErrorInterceptor {
  (error: AxiosError): Promise<AxiosError>;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const responseInterceptor: ResponseInterceptor = (response) => response;

const errorInterceptor: ErrorInterceptor = (error) => {
  if (error.response && error.response.status === 401) {
    localStorage.clear();
  }
  return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
