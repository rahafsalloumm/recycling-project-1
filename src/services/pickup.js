import api from './api'

const pickupService = {
  getMyPickups: (params) => api.get('/api/wasterequest/myrequest', { params }),

  getPickup: (id) => api.get(`/api/wasterequest/${id}`),

  createPickup: (data) => api.post('/api/wasterequest', data),

  updatePickup: (id, data) => api.put(`/api/wasterequest/${id}`, data),

  cancelPickup: (id) => api.delete(`/api/wasterequest/${id}`),
}

export default pickupService
