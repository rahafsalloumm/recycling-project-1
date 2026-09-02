import api from './api'

const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),

  register: (data) => api.post('/api/auth/register', data),

  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),

  resetPassword: (data) => api.post('/api/auth/reset-password', data),

  getProfile: () => api.get('/api/auth/me'),

  logout: () => {
    localStorage.removeItem('token')
  },
}

export default authService
