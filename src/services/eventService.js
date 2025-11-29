import api from './api';

export const eventService = {
  getAllEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },

  getEvent: async (id) => {
    const response = await api.get(`/events/${id}`);
    return response.data;
  },

  createEvent: async (eventData) => {
    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
      if (key === 'coverImage' && eventData[key] instanceof File) {
        formData.append('coverImage', eventData[key]);
      } else if (eventData[key] !== null && eventData[key] !== undefined) {
        formData.append(key, eventData[key]);
      }
    });
    
    const response = await api.post('/events', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateEvent: async (id, eventData) => {
    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
      if (key === 'coverImage' && eventData[key] instanceof File) {
        formData.append('coverImage', eventData[key]);
      } else if (eventData[key] !== null && eventData[key] !== undefined) {
        formData.append(key, eventData[key]);
      }
    });
    
    const response = await api.put(`/events/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteEvent: async (id) => {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  },

  getEventByInviteLink: async (link) => {
    const response = await api.get(`/events/invite/${link}`);
    return response.data;
  },
};

