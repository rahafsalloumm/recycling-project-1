import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import StatCard from '@/shared/components/StatCard';
import MapSection from '@/features/driver/components/home/MapSection';
import TasksList from '@/features/driver/components/home/TasksList';
import DashboardGrid from '@/features/driver/components/home/DashboardGrid';
import driverService from '@/services/driver';

import { FiBattery, FiNavigation, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';
import { useEffect, useState } from 'react';

const DriverDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [statsData, setStatsData] = useState(null);
  const [routeData, setRouteData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboardResponse, routeResponse] = await Promise.all([
          driverService.getDashboard(),
          driverService.getRoute().catch((routeError) => {
            if (routeError.response?.status === 404) {
              return null;
            }
            throw routeError;
          }),
        ]);

        setStatsData(dashboardResponse.data?.data || null);
        setDashboardData(dashboardResponse.data?.data?.mainDashboardAndDailyRoute || null);
        setRouteData(routeResponse?.data?.data || null);
      } catch (loadError) {
        const status = loadError.response?.status;
        setError(
          status === 401
            ? 'انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.'
            : status === 403
              ? 'ليس لديك صلاحية للوصول إلى لوحة السائق.'
              : 'تعذر تحميل بيانات لوحة السائق. حاول مرة أخرى.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    // 💡 هذا التقسيم الذكي يجبر السايد بار واللوحة على الوقوف جنباً إلى جنب كأعمدة حقيقية بدون تداخل نهائياً
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      
      {/* العمود الأول: السايد بار الثابت في جهة اليمين */}
      <Sidebar />

      {/* العمود الثاني: محتوى اللوحة بالكامل، يأخذ باقي المساحة ويتحرك لأسفل بسكرول مستقل ناعم */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]"> 
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* كروت الإحصائيات الخمسة */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard title="الوقود المتبقي" value={dashboardData ? `${dashboardData.fuelPercentage}%` : '—'} subtext="تقريباً" icon={<FiBattery />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/50" />
              <StatCard title="المسافة المتبقية" value={dashboardData?.coreCards?.remainingDistanceKm ?? '—'} subtext="كم" icon={<FiNavigation />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/50" />
              <StatCard title="المهام المتبقية" value={dashboardData?.coreCards?.remaining ?? '—'} subtext="مهمة" icon={<FiClock />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/50" />
              <StatCard title="المهام المكتملة" value={dashboardData?.coreCards?.completed ?? '—'} subtext="حتى الآن" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/50" />
              <StatCard title="إجمالي المهام" value={dashboardData?.coreCards?.totalTasks ?? '—'} subtext="مهمة اليوم" icon={<FiFileText />} colorClass="bg-teal-50 text-teal-600 border border-teal-100/50" />
            </div>

            {isLoading && <p className="text-sm text-gray-500">جارٍ تحميل بيانات لوحة السائق...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}
            {!isLoading && !error && !routeData && (
              <p className="text-sm text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                لا يوجد Route نشط حالياً لهذا السائق.
              </p>
            )}

            {/* الخريطة وقائمة المهام المنظمة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MapSection route={routeData} />
              <TasksList route={routeData} />
            </div>

            {/* الجريد السفلي */}
            <DashboardGrid data={dashboardData} totalBins={statsData?.smartBinsPage?.totalBins} />
          </main>
        </div>

        {/* فوتر اللوحة */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>مشروع EcoCycle لإعادة التدوير الذكي • شكرًا لجهودك اليومية في حماية البيئة!</span>
        </footer>
      </div>

    </div>
  );
};

export default DriverDashboard;
