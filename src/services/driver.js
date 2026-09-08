import api from './api'

const driverService = {
  getDashboard: () => api.get('/api/stats/driver-stats'),

  getProfile: () => api.get('/api/auth/profile'),

  updateProfile: (data) => api.put('/user/profile', data),

  getContactInfo: () => api.get('/api/contact/info'),

  getTasks: (params) => api.get('/api/stats/driver-stats', { params }),

  getTask: (id) => api.get(`/api/wasterequest/${id}`),

  updateTaskStatus: (routeId, waypointId) =>
    api.put(`/api/route/${routeId}`, { waypointId }),

  getRoute: () => api.get('/api/route/my-route'),

  getHomes: (params) => api.get('/api/stats/driver-stats', { params }),

  getHome: (id) => api.get(`/api/wasterequest/${id}`),

  getHistory: (params) => api.get('/api/stats/driver-stats', { params }),

  getStats: () => api.get('/api/stats/driver-stats'),
}

export default driverService
