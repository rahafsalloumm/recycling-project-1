import { FiFileText, FiCheckCircle, FiXCircle, FiActivity, FiClock } from 'react-icons/fi';
import StatCard from '@/shared/components/StatCard';

const HistoryStats = ({ stats, isLoading = false }) => {
  const formatValue = (value) => value === undefined || value === null ? '—' : value;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-emerald-100/40 bg-white px-5 py-4 text-sm font-bold text-emerald-700" role="status">
        جارٍ تحميل إحصائيات سجل المهام...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي المهام" value={formatValue(stats?.totalTasks)} subtext="مهمة مسجلة" icon={<FiFileText />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="مهام مكتملة" value={formatValue(stats?.completedTasks)} subtext="مهمة منجزة" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="مهام ملغاة" value={formatValue(stats?.cancelledTasks)} subtext="مهام" icon={<FiXCircle />} colorClass="bg-red-50 text-red-600 border border-red-100/40" />
      <StatCard title="مهام قيد التنفيذ" value={formatValue(stats?.inProgressTasks)} subtext="مهام حالية" icon={<FiActivity />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="متوسط الوقت لكل مهمة" value={formatValue(stats?.averageTimePerTask)} subtext="دقيقة" icon={<FiClock />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
    </div>
  );
};

export default HistoryStats;
