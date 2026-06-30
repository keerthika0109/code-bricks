import api from './client';

export const reviewsApi = {
  submit: (data) => api.post('/reviews', data),
  mine: () => api.get('/reviews/mine'),
};

export const suggestionsApi = {
  submit: (data) => api.post('/suggestions', data),
};

export const profileApi = {
  get: () => api.get('/profile'),
  update: (data) => api.put('/profile', data),
};
