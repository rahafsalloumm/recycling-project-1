import api from './api'

const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),

  register: (data) => api.post('/api/auth/register', data),

  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),

  verifyCode: (data) => api.post('/api/auth/verify-code', data),

  updatePassword: (data) => api.post('/api/auth/update-password', data),

  resetPassword: (data) => api.post('/api/auth/update-password', data),

  getProfile: () => api.get('/api/auth/profile'),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export default authService
