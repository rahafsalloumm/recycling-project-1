import api from '@/services/api'

export const getDashboardData = async () => {
  return api.get('/admin/dashboard');
};