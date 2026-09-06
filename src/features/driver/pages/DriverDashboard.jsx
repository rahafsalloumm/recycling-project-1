import { useEffect, useMemo, useState } from 'react';
import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import StatCard from '@/shared/components/StatCard';
import MapSection from '@/features/driver/components/home/MapSection';
import TasksList from '@/features/driver/components/home/TasksList';
import DashboardGrid from '@/features/driver/components/home/DashboardGrid';
import driverService from '@/services/driver';

import { FiBattery, FiNavigation, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';

const DriverDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await driverService.getStats();
        setStats(response?.data || response);
      } catch (err) {
        setError(err?.message || 'تعذر تحميل لوحة السائق');
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const dashboardData = useMemo(() => {
    const data = stats?.mainDashboardAndDailyRoute || {};
    const cards = data.coreCards || {};

    return {
      fuelPercentage: data.fuelPercentage ?? 68,
      remainingDistance: cards.remainingDistanceKm ?? 24.6,
      remainingTasks: cards.remaining ?? 9,
      completedTasks: cards.completed ?? 3,
      totalTasks: cards.totalTasks ?? 12,
      binsWidget: data.bottomSummaryWidgets?.binsWidget || {},
      homeWidget: data.bottomSummaryWidgets?.homeRequestsWidget || {},
    };
  }, [stats]);

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            {loading ? (
              <div className="text-center text-gray-500 py-12">جاري تحميل بيانات السائق...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-12">{error}</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <StatCard title="الوقود المتبقي" value={`${dashboardData.fuelPercentage}%`} subtext="تقريباً" icon={<FiBattery />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/50" />
                  <StatCard title="المسافة المتبقية" value={dashboardData.remainingDistance} subtext="كم" icon={<FiNavigation />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/50" />
                  <StatCard title="المهام المتبقية" value={dashboardData.remainingTasks} subtext="مهمة" icon={<FiClock />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/50" />
                  <StatCard title="المهام المكتملة" value={dashboardData.completedTasks} subtext="حتى الآن" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/50" />
                  <StatCard title="إجمالي المهام" value={dashboardData.totalTasks} subtext="مهمة اليوم" icon={<FiFileText />} colorClass="bg-teal-50 text-teal-600 border border-teal-100/50" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <MapSection />
                  <TasksList />
                </div>

                <DashboardGrid />
              </>
            )}
          </main>
        </div>

        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>مشروع EcoCycle لإعادة التدوير الذكي • شكرًا لجهودك اليومية في حماية البيئة!</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverDashboard;
