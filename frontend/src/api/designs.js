import api from './client';

export const designsApi = {
  list: (params) => api.get('/designs', { params }),
  get: (id) => api.get(`/designs/${id}`),
  preview: (id, overrides) => api.post(`/designs/${id}/preview`, { overrides }),

  /**
   * Downloads return a binary zip, so we bypass the JSON-unwrapping
   * interceptor by using api.raw directly with responseType: 'blob'.
   */
  download: async (id, overrides, filename = 'design.zip') => {
    const response = await api.raw.post(
      `/designs/${id}/download`,
      { overrides },
      { responseType: 'blob' }
    );
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },

  reviews: (designId) => api.get(`/designs/${designId}/reviews`),
};
