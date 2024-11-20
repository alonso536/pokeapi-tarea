import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export class HttpService {
  private axiosInstance: AxiosInstance;
  private apiUrl: string = 'https://pokeapi.co/api/v2/';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.apiUrl,
      timeout: 5000,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T | null> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
      return response.data;
    } catch(error: unknown) {
      return null;
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
      return response.data;
    } catch(error: unknown) {
      throw error;
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
      return response.data;
    } catch(error: unknown) {
      throw error;
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
      return response.data;
    } catch(error: unknown) {
      throw error;
    }
  }
}