import { FiFileText, FiCheckCircle, FiLoader, FiClock, FiNavigation } from 'react-icons/fi';
import StatCard from '@/shared/components/StatCard';

const TasksStats = ({ data, route }) => {
  const taskStats = data?.taskLogPage;
  const routeStats = data?.mainDashboardAndDailyRoute?.coreCards;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي المهام" value={taskStats?.totalTasks ?? '—'} subtext="مهمة اليوم" icon={<FiFileText />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
      <StatCard title="المهام المكتملة" value={taskStats?.completedTasks ?? routeStats?.completed ?? '—'} subtext="حتى الآن" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="المهام قيد التنفيذ" value={taskStats?.inProgressTasks ?? '—'} subtext="مهام" icon={<FiLoader className="animate-spin" />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/40" />
      <StatCard title="المهام المتبقية" value={route?.remainingTasks ?? routeStats?.remaining ?? '—'} subtext="مهام" icon={<FiClock />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="المسافة المتبقية" value={route?.remainingDistanceKm ?? routeStats?.remainingDistanceKm ?? '—'} subtext="كم" icon={<FiNavigation />} colorClass="bg-teal-50 text-teal-600 border border-teal-100/40" />
    </div>
  );
};

export default TasksStats;
