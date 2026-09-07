import api from './api'

const publicService = {
  getLandingPageStats: () => api.get('/api/stats/landing-page'),
}

export default publicService
