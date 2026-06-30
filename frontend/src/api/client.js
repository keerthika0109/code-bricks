import axios from 'axios';

/**
 * Single axios instance for the whole app.
 *
 * Every Laravel response (success or error) follows the same envelope:
 *   { success, message, data, errors?, error_code? }
 *
 * We attach the JWT automatically and normalize errors here so every
 * page/component can just do:
 *
 *   try {
 *     const data = await api.get('/designs');
 *   } catch (err) {
 *     err.message       -> human readable message
 *     err.errors         -> field validation errors, or null
 *     err.errorCode       -> 'VALIDATION_ERROR' | 'NOT_FOUND' | ...
 *     err.statusCode      -> 422, 404, ...
 *   }
 */
const client = axios.create({
  baseURL: '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('codebricks_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response.data, // unwrap { success, message, data } automatically
  (error) => {
    const payload = error.response?.data;

    const normalized = {
      message: payload?.message || 'Something went wrong. Please try again.',
      errors: payload?.errors || null,
      errorCode: payload?.error_code || 'UNKNOWN_ERROR',
      statusCode: error.response?.status || 0,
    };

    // Token expired/invalid anywhere in the app -> force back to login.
    if (normalized.statusCode === 401 && ['TOKEN_EXPIRED', 'TOKEN_INVALID', 'TOKEN_NOT_FOUND', 'UNAUTHORIZED'].includes(normalized.errorCode)) {
      localStorage.removeItem('codebricks_token');
      localStorage.removeItem('codebricks_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(normalized);
  }
);

const api = {
  get: (url, config) => client.get(url, config),
  post: (url, body, config) => client.post(url, body, config),
  put: (url, body, config) => client.put(url, body, config),
  patch: (url, body, config) => client.patch(url, body, config),
  delete: (url, config) => client.delete(url, config),
  raw: client, // for cases needing the raw axios instance (e.g. blob downloads)
};

export default api;
