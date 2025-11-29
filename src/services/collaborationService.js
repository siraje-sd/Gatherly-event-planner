import api from './api';

export const collaborationService = {
  getEventCollaborations: async (eventId) => {
    const response = await api.get(`/collaborations/event/${eventId}`);
    return response.data;
  },

  addCollaborator: async (collaborationData) => {
    const response = await api.post('/collaborations', collaborationData);
    return response.data;
  },

  updateCollaborationRole: async (id, role) => {
    const response = await api.put(`/collaborations/${id}`, { role });
    return response.data;
  },

  removeCollaborator: async (id) => {
    const response = await api.delete(`/collaborations/${id}`);
    return response.data;
  },
};

