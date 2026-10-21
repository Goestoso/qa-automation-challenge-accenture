import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { config } from '@src/utils/config';

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseURL: string = config.apiBaseUrl) {
    this.client = axios.create({
      baseURL,
      timeout: config.apiTimeoutMs,
      validateStatus: () => true,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  get<T>(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, requestConfig);
  }

  post<T>(url: string, data?: unknown, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, requestConfig);
  }
}
