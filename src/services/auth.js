import api from './api'

const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),

  register: (data) => api.post('/api/auth/register', data),

  forgotPassword: (data) => api.post('/api/auth/forgot-password', data),

  verifyCode: (data) => api.post('/api/auth/verify-code', data),

  updatePassword: (data) => api.post('/api/auth/update-password', data),

  getProfile: () => api.get('/api/auth/me'),

  logout: () => {
    localStorage.removeItem('token')
  },
}

export default authService
