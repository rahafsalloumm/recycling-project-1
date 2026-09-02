import { FiFileText, FiCheckCircle, FiXCircle, FiActivity, FiClock } from 'react-icons/fi';
import StatCard from '@/shared/components/StatCard';

const HistoryStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي المهام" value="98" subtext="مهمة مسجلة" icon={<FiFileText />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="مهام مكتملة" value="82" subtext="مهمة منجزة" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="مهام ملغاة" value="6" subtext="مهام" icon={<FiXCircle />} colorClass="bg-red-50 text-red-600 border border-red-100/40" />
      <StatCard title="مهام قيد التنفيذ" value="10" subtext="مهام حالية" icon={<FiActivity />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="متوسط الوقت لكل مهمة" value="24" subtext="دقيقة" icon={<FiClock />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
    </div>
  );
};

export default HistoryStats;
