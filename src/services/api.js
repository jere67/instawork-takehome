import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

export const teamMemberService = {
  getAll: async () => {
    const response = await api.get('/team-members/');
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/team-members/${id}/`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post('/team-members/', data);
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.put(`/team-members/${id}/`, data);
    return response.data;
  },

  delete: async (id) => {
    await api.delete(`/team-members/${id}/`);
  }
};