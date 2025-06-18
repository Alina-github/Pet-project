import { ofetch } from 'ofetch';

interface FetchHelper {
  get<T>(url: string, params?: Record<string, any>, options?: RequestInit): Promise<T>;
  post<T>(url: string, body?: any, options?: RequestInit): Promise<T>;
  put<T>(url: string, body?: any, options?: RequestInit): Promise<T>;
  delete<T>(url: string, options?: RequestInit): Promise<T>;
}

interface FetchHelperConfig {
  baseURL: string;
  headers?: Record<string, string>;
}

// Function to create a new fetch helper instance
const createFetchHelper = (config: FetchHelperConfig): FetchHelper => {
  const instance = ofetch.create({
    baseURL: config.baseURL,
    headers: config.headers,
  });

  return {
    // TODO: Add types for params.
    get: async <T>(url, params = {}, options = {}) =>
      instance<T>(url, { method: 'GET', query: params, ...options }),

    post: async <T>(url, body, options = {}) =>
      instance<T>(url, { method: 'POST', body, ...options }),

    put: async <T>(url, body, options = {}) =>
      instance<T>(url, { method: 'PUT', body, ...options }),

    delete: async <T>(url, options = {}) => instance<T>(url, { method: 'DELETE', ...options }),
  };
};

// Create a default API instance with a base URL
export const api = createFetchHelper({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
}); 