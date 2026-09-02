import api from './api'

const pickupService = {
  getMyPickups: (params) => api.get('/api/pickups', { params }),

  getPickup: (id) => api.get(`/api/pickups/${id}`),

  createPickup: (data) => api.post('/api/pickups', data),

  updatePickup: (id, data) => api.put(`/api/pickups/${id}`, data),

  cancelPickup: (id) => api.put(`/api/pickups/${id}/cancel`),
}

export default pickupService
