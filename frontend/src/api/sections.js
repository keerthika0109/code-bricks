import api from './client';

export const sectionsApi = {
  list: () => api.get('/sections'),
  getBySlug: (slug) => api.get(`/sections/${slug}`),
};
