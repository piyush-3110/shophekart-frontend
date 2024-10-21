import { envConfig } from "@/config/envConfig";
import { IHttpResponse } from "@/types";
import axios, { AxiosRequestConfig } from "axios";

const httpRequestService = {
  fetchApi: async <T>(endpoint: string, options: AxiosRequestConfig = {}) => {
    const response = await axios.get(`${envConfig.BACKEND_URL}${endpoint}`, {
      withCredentials: true,
      ...options,
    });
    return response.data as IHttpResponse<T>;
  },

  postApi: async <T, K>(
    endpoint: string,
    data?: K,
    options: AxiosRequestConfig = {}
  ) => {
    const response = await axios.post(
      `${envConfig.BACKEND_URL}${endpoint}`,
      data,
      {
        withCredentials: true,
        ...options,
      }
    );
    return response.data as IHttpResponse<T>;
  },
};

export default httpRequestService;
