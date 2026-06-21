import { BASE_URL } from '../constants/api';

export class ApiError extends Error {
  status: number;

  constructor(status: number, message?: string) {
    super(message || `Request failed with status ${status}`);
    this.name = 'ApiError';
    this.status = status;
  }
}

const wait = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

async function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: unknown = null,
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-Type': 'application/json; charset=UTF-8',
    };
  }

  await wait(50);

  const response = await fetch(`${BASE_URL}${url}.json`, options);

  if (!response.ok) {
    throw new ApiError(response.status, response.statusText);
  }

  return response.json();
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: unknown) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: unknown) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
