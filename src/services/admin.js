import api from './api'

const adminService = {
  getDashboard: () => api.get('/api/admin/dashboard'),

  getUsers: (params) => api.get('/api/admin/users', { params }),

  getUser: (id) => api.get(`/api/admin/users/${id}`),

  createUser: (data) => api.post('/api/admin/users', data),

  updateUser: (id, data) => api.put(`/api/admin/users/${id}`, data),

  deleteUser: (id) => api.delete(`/api/admin/users/${id}`),

  getDrivers: (params) => api.get('/api/admin/drivers', { params }),

  getDriver: (id) => api.get(`/api/admin/drivers/${id}`),

  createDriver: (data) => api.post('/api/admin/drivers', data),

  updateDriver: (id, data) => api.put(`/api/admin/drivers/${id}`, data),

  deleteDriver: (id) => api.delete(`/api/admin/drivers/${id}`),

  approveDriver: (id) => api.put(`/api/admin/drivers/${id}/approve`),

  rejectDriver: (id) => api.put(`/api/admin/drivers/${id}/reject`),

  getOrders: (params) => api.get('/api/admin/orders', { params }),

  getOrder: (id) => api.get(`/api/admin/orders/${id}`),

  updateOrderStatus: (id, status) => api.put(`/api/admin/orders/${id}/status`, { status }),

  deleteOrder: (id) => api.delete(`/api/admin/orders/${id}`),

  getBins: (params) => api.get('/api/admin/bins', { params }),

  getBin: (id) => api.get(`/api/admin/bins/${id}`),

  createBin: (data) => api.post('/api/admin/bins', data),

  updateBin: (id, data) => api.put(`/api/admin/bins/${id}`, data),

  deleteBin: (id) => api.delete(`/api/admin/bins/${id}`),

  getRoutes: (params) => api.get('/api/admin/routes', { params }),

  getRoute: (id) => api.get(`/api/admin/routes/${id}`),

  createRoute: (data) => api.post('/api/admin/routes', data),

  updateRoute: (id, data) => api.put(`/api/admin/routes/${id}`, data),

  deleteRoute: (id) => api.delete(`/api/admin/routes/${id}`),

  assignRoute: (routeId, driverId) => api.put(`/api/admin/routes/${routeId}/assign`, { driverId }),

  getReports: (params) => api.get('/api/admin/reports', { params }),

  getReport: (id) => api.get(`/api/admin/reports/${id}`),

  createReport: (data) => api.post('/api/admin/reports', data),

  getRewards: (params) => api.get('/api/admin/rewards', { params }),

  getReward: (id) => api.get(`/api/admin/rewards/${id}`),

  createReward: (data) => api.post('/api/admin/rewards', data),

  updateReward: (id, data) => api.put(`/api/admin/rewards/${id}`, data),

  deleteReward: (id) => api.delete(`/api/admin/rewards/${id}`),

  getSupport: (params) => api.get('/api/admin/support', { params }),

  replySupport: (id, data) => api.post(`/api/admin/support/${id}/reply`, data),

  getSettings: () => api.get('/api/admin/settings'),

  updateSettings: (data) => api.put('/api/admin/settings', data),
}

export default adminService
