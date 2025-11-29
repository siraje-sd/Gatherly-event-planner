import api from './api';

export const invitationService = {
  getEventInvitations: async (eventId) => {
    const response = await api.get(`/invitations/event/${eventId}`);
    return response.data;
  },

  createInvitation: async (invitationData) => {
    const response = await api.post('/invitations', invitationData);
    return response.data;
  },

  updateInvitationStatus: async (id, status) => {
    const response = await api.put(`/invitations/${id}/status`, { status });
    return response.data;
  },

  deleteInvitation: async (id) => {
    const response = await api.delete(`/invitations/${id}`);
    return response.data;
  },
};

