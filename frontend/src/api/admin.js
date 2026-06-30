import api from './client';

export const adminApi = {
  // Dashboard
  dashboard: () => api.get('/admin/dashboard'),

  // Users
  listUsers: (params) => api.get('/admin/users', { params }),
  userStats: () => api.get('/admin/users/stats'),
  getUser: (id) => api.get(`/admin/users/${id}`),
  activateUser: (id) => api.patch(`/admin/users/${id}/activate`),
  deactivateUser: (id) => api.patch(`/admin/users/${id}/deactivate`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),

  // Sections
  listSections: () => api.get('/admin/sections'),
  createSection: (data) => api.post('/admin/sections', data),
  updateSection: (id, data) => api.put(`/admin/sections/${id}`, data),
  deleteSection: (id) => api.delete(`/admin/sections/${id}`),

  // Designs
  createDesign: (data) => api.post('/admin/designs', data),
  updateDesignMeta: (id, data) => api.put(`/admin/designs/${id}/meta`, data),
  updateDesignFiles: (id, data) => api.put(`/admin/designs/${id}/files`, data),
  deleteDesign: (id) => api.delete(`/admin/designs/${id}`),

  // Reviews
  listReviews: (params) => api.get('/admin/reviews', { params }),
  approveReview: (id) => api.patch(`/admin/reviews/${id}/approve`),
  rejectReview: (id) => api.patch(`/admin/reviews/${id}/reject`),
  deleteReview: (id) => api.delete(`/admin/reviews/${id}`),

  // Suggestions
  listSuggestions: (params) => api.get('/admin/suggestions', { params }),
  markSuggestionRead: (id) => api.patch(`/admin/suggestions/${id}/read`),
  markSuggestionResolved: (id) => api.patch(`/admin/suggestions/${id}/resolve`),
  deleteSuggestion: (id) => api.delete(`/admin/suggestions/${id}`),
};
