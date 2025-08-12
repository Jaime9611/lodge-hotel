import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";

export interface ErrorResponse {
  message: string;
  code?: string;
  details?: any;
}

abstract class ApiClient {
  protected readonly instance: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({ baseURL, ...config });
  }

  protected async request<T>(config: AxiosRequestConfig): Promise<T> {
    this.instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log(error.response);
          if (error.response.statusText === "Unauthorized") {
            console.log("Token has expired. Logging out...");
            localStorage.removeItem("user");
            localStorage.removeItem("access_token");
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      }
    );
    try {
      const response = await this.instance.request<T>(config);

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        const errorResponse: ErrorResponse = {
          message: axiosError.message,
          code: axiosError.code,
          details: axiosError.response?.data,
        };

        throw errorResponse;
      } else {
        const errorResponse: ErrorResponse = {
          message: (error as Error).message || "An unexpected error ocurred.",
        };

        throw errorResponse;
      }
    }
  }

  protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET", url });
  }

  protected async post<T, U>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<U> {
    return this.request<U>({ ...config, method: "POST", url, data });
  }

  protected async update<T>(
    url: string,
    data: T,
    config?: AxiosRequestConfig
  ): Promise<void> {
    return this.request({ ...config, method: "PUT", url, data });
  }

  protected async delete(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<void> {
    return this.request({ ...config, method: "DELETE", url });
  }

  protected getToken() {
    return localStorage.getItem("access_token")?.replace(/"/g, "") ?? "";
  }
}

export default ApiClient;
