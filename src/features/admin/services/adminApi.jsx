import api from '@/services/api'

export const getDashboardData = async () => {
  const res = await api.get('/api/admin/dashboard');
  return res.data;
};