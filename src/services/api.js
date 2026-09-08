import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://recycle-backend-m8st.onrender.com',
  
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type']
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
      const responseData = error.response?.data
      const message = Array.isArray(responseData)
        ? responseData.join(' • ')
        : responseData?.message ||
          responseData?.error ||
          error.message ||
          'حدث خطأ غير متوقع'

    const normalizedErrorText = Array.isArray(responseData)
      ? responseData.join(' ')
      : responseData?.message || responseData?.error || ''
    const isMissingAuthenticatedUser = status === 404 && /user not found|المستخدم غير موجود/i.test(normalizedErrorText)

    const skipAuthRedirect = error.config?.skipAuthRedirect === true

    if (!skipAuthRedirect && (status === 401 || isMissingAuthenticatedUser)) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject({
      status,
      message,
      errors: error.response?.data?.errors,
      original: error,
    })
  }
)

export default api
