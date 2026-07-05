import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { useAuthStore } from "@/stores/authStore";

class ApiService {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:4000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("access_token");
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error) => {
        const status = error.response?.status;

        if (status === 401) {
          console.error("Unauthorized! Redirecting to login ...");
          useAuthStore.getState().logout();
        }

        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config);
  }

  public patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.patch(url, data, config);
  }
}

const apiService = new ApiService();
export default apiService;
