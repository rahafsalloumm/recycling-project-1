import api from './api'

const driverService = {
  getDashboard: () => api.get('/api/driver/dashboard'),

  getProfile: () => api.get('/api/driver/profile'),

  updateProfile: (data) => api.put('/api/driver/profile', data),

  getTasks: (params) => api.get('/api/driver/tasks', { params }),

  getTask: (id) => api.get(`/api/driver/tasks/${id}`),

  updateTaskStatus: (id, status) => api.put(`/api/driver/tasks/${id}/status`, { status }),

  getRoute: () => api.get('/api/driver/route'),

  updateRouteLocation: (data) => api.post('/api/driver/route/location', data),

  getBins: (params) => api.get('/api/driver/bins', { params }),

  getBin: (id) => api.get(`/api/driver/bins/${id}`),

  updateBinStatus: (id, data) => api.put(`/api/driver/bins/${id}/status`, data),

  getHomes: (params) => api.get('/api/driver/homes', { params }),

  getHome: (id) => api.get(`/api/driver/homes/${id}`),

  getHistory: (params) => api.get('/api/driver/history', { params }),

  getStats: () => api.get('/api/driver/stats'),
}

export default driverService
