import api from './client';

export const wishlistApi = {
  list: () => api.get('/wishlist'),
  add: (designId) => api.post('/wishlist', { design_id: designId }),
  remove: (designId) => api.delete(`/wishlist/${designId}`),
  toggle: (designId) => api.post(`/wishlist/${designId}/toggle`),
};
