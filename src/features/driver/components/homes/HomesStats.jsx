import { FiFileText, FiClock, FiTruck, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import StatCard from '@/shared/components/StatCard';

const HomesStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي الطلبات" value="28" subtext="طلب" icon={<FiFileText />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="قيد الانتظار" value="6" subtext="طلبات" icon={<FiClock />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/40" />
      <StatCard title="في الطريق" value="7" subtext="طلبات" icon={<FiTruck />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="مكتملة اليوم" value="15" subtext="طلب" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="ملغاة" value="0" subtext="طلبات" icon={<FiXCircle />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
    </div>
  );
};

export default HomesStats;
