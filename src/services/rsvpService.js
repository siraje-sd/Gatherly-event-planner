import api from './api';

export const rsvpService = {
  getEventRSVPs: async (eventId) => {
    const response = await api.get(`/rsvps/event/${eventId}`);
    return response.data;
  },

  getMyRSVP: async (eventId) => {
    const response = await api.get(`/rsvps/my/${eventId}`);
    return response.data;
  },

  createOrUpdateRSVP: async (rsvpData) => {
    const response = await api.post('/rsvps', rsvpData);
    return response.data;
  },

  deleteRSVP: async (id) => {
    const response = await api.delete(`/rsvps/${id}`);
    return response.data;
  },
};

