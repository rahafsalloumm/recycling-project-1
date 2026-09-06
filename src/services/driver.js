import api from './api'

const driverService = {
  getDashboard: () => api.get('/api/stats/driver-stats'),

  getProfile: () => api.get('/user/profile'),

  updateProfile: (data) => api.put('/user/profile', data),

  getTasks: (params) => api.get('/api/route/my-route', { params }),

  getTask: (id) => api.get(`/api/route/${id}`),

  updateTaskStatus: (id, status) => api.put(`/api/route/${id}`, { status }),

  getRoute: () => api.get('/api/route/my-route'),

  updateRouteLocation: (data) => api.post('/api/route/my-route', data),

  getBins: () => api.get('/api/bins'),

  getBin: (id) => api.get(`/api/bins/${id}`),

  updateBinStatus: (id, data) => api.put(`/api/bins/${id}/status`, data),

  getHomes: () => api.get('/api/wasterequest'),

  getHome: (id) => api.get(`/api/wasterequest/${id}`),

  getHistory: () => api.get('/api/stats/driver-stats'),

  getStats: () => api.get('/api/stats/driver-stats'),
}

export default driverService
