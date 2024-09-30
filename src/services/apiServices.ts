import { getAccessToken } from '../tokenManager';
import { API_FULL_URL } from '../types/ApiTypes';
import { TableData } from '../types/table';

type FetchAPIMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type FetchAPIResponseType = 'json' | 'text' | 'blob';

interface FetchAPIOptions {
  method?: FetchAPIMethod;
  headers?: HeadersInit;
  body?: Record<string, unknown> | TableData | null;
  queryParams?: Record<string, string | number>;
  signal?: AbortSignal;
  responseType?: FetchAPIResponseType;
}

async function fetchAPI<T>(endpoint: string, options: FetchAPIOptions = {}): Promise<T> {
  const {
    method = 'GET',
    headers = {},
    body = null,
    queryParams = {},
    signal,
    responseType = 'json',
  } = options;

  const accessToken = getAccessToken();

  try {
    const queryString = new URLSearchParams(queryParams as Record<string, string>).toString();
    const fullUrl = queryString
      ? `${API_FULL_URL}${endpoint}?${queryString}`
      : `${API_FULL_URL}${endpoint}`;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      signal,
      credentials: 'include',
    };

    if (['POST', 'PUT', 'DELETE'].includes(method) && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(fullUrl, fetchOptions);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `HTTP error! status: ${response.status}`;

      try {
        const errorData = JSON.parse(errorText);
        if (errorData.message) {
          errorMessage = errorData.message;
        }
      } catch (jsonError) {
        console.warn('Failed to parse error response as JSON:', jsonError);
      }

      throw new Error(errorMessage);
    }

    // Handle different response types
    switch (responseType) {
      case 'blob':
        return (await response.blob()) as unknown as T;
      case 'text':
        return (await response.text()) as unknown as T;
      case 'json':
      default:
        return (await response.json()) as T;
    }
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      console.error('Fetch request was aborted');
    } else {
      console.error('Fetch API error:', error);
    }
    throw error;
  }
}

export { fetchAPI };
