import React from 'react';
import { FiFileText, FiCheckCircle, FiLoader, FiClock, FiNavigation } from 'react-icons/fi';
import StatCard from '../../../../shared/components/StatCard';

const TasksStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" dir="rtl">
      <StatCard title="إجمالي المهام" value="12" subtext="مهمة اليوم" icon={<FiFileText />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/40" />
      <StatCard title="المهام المكتملة" value="3" subtext="حتى الآن" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/40" />
      <StatCard title="المهام قيد التنفيذ" value="4" subtext="مهام" icon={<FiLoader className="animate-spin" />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/40" />
      <StatCard title="المهام المتبقية" value="5" subtext="مهام" icon={<FiClock />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/40" />
      <StatCard title="المسافة المتبقية" value="24.6" subtext="كم" icon={<FiNavigation />} colorClass="bg-teal-50 text-teal-600 border border-teal-100/40" />
    </div>
  );
};

export default TasksStats;
