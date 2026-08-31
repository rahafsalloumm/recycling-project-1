import React from 'react';
import { FiTrash2, FiUnlock, FiAlertTriangle, FiActivity, FiPercent } from 'react-icons/fi';
import StatCard from '../../../../shared/components/StatCard';

const BinsStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي الحاويات" value="48" subtext="حاوية" icon={<FiTrash2 />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="حاويات متاحة" value="18" subtext="حاوية" icon={<FiUnlock />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="حاويات ممتلئة" value="22" subtext="حاوية" icon={<FiAlertTriangle />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/40" />
      <StatCard title="حاويات تحتاج تفريغ" value="8" subtext="حاويات" icon={<FiActivity />} colorClass="bg-red-50 text-red-600 border border-red-100/40" />
      <StatCard title="متوسط مستوى الامتلاء" value="68%" subtext="متوسط" icon={<FiPercent />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
    </div>
  );
};

export default BinsStats;
