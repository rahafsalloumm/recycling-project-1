import api from './api'

const userService = {
  getDashboard: () => api.get('/api/stats/user-stats'),

  getStats: () => api.get('/api/stats/user-stats'),

  getDashboardStats: () => api.get('/api/stats/user-stats'),

  getNotifications: () => api.get('/api/user/notifications'),

  markNotificationRead: (id) => api.put(`/api/user/notifications/${id}/read`),

  getProfile: () => api.get('/user/profile'),

  updateProfile: (data) => api.put('/user/profile', data),

  getRecyclingHistory: () => api.get('/api/wasterequest/myrequest'),

  getMyRequests: () => api.get('/api/wasterequest/myrequest'),

  createWasteRequest: (formData) => api.post('/api/wasterequest', formData),

  updatePreferences: (data) => api.put('/api/user/preferences', data),

  changePassword: (data) => api.put('/api/user/password', data),

  getActivities: () => api.get('/api/user/activities'),

  contactSupport: (data) => api.post('/api/message/send', data),

  sendMessage: (data) => api.post('/api/message/send', data),
}

export default userService
