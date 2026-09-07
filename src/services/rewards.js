import api from './api'

const rewardsService = {
  getAvailableRewards: () => api.get('/api/rewards'),

  getMyRewards: () => api.get('/api/rewardclaim'),

  getMyClaims: () => api.get('/api/rewardclaim'),

  getReward: (id) => api.get(`/api/rewards/${id}`),

  redeemReward: (rewardId, data = {}) => api.post('/api/rewardclaim/claim', { rewardId, ...data }),

  getMyPoints: () => api.get('/api/rewards/points'),
}

export default rewardsService
