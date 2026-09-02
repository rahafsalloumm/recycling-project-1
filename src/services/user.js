import api from './api'

const userService = {
  getDashboard: () => api.get('/api/user/dashboard'),

  getStats: () => api.get('/api/user/stats'),

  getNotifications: () => api.get('/api/user/notifications'),

  markNotificationRead: (id) => api.put(`/api/user/notifications/${id}/read`),

  getProfile: () => api.get('/api/user/profile'),

  updateProfile: (data) => api.put('/api/user/profile', data),

  getRecyclingHistory: () => api.get('/api/user/recycling'),

  updatePreferences: (data) => api.put('/api/user/preferences', data),

  changePassword: (data) => api.put('/api/user/password', data),

  getActivities: () => api.get('/api/user/activities'),

  contactSupport: (data) => api.post('/api/user/support', data),
}

export default userService
