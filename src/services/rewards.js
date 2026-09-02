import api from './api'

const rewardsService = {
  getAvailableRewards: () => api.get('/api/rewards'),

  getMyRewards: () => api.get('/api/rewards/my'),

  getReward: (id) => api.get(`/api/rewards/${id}`),

  redeemReward: (id) => api.post(`/api/rewards/${id}/redeem`),

  getMyPoints: () => api.get('/api/rewards/points'),
}

export default rewardsService
