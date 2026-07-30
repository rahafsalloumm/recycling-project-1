export const getDashboardData = async () => {
  const res = await fetch("https://your-backend.com/api/admin/dashboard");
  return await res.json();
};