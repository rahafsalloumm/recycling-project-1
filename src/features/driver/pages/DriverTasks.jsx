import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import TasksHeader from '@/features/driver/components/tasks/TasksHeader';
import TasksStats from '@/features/driver/components/tasks/TasksStats';
import DetailedTasksList from '@/features/driver/components/tasks/DetailedTasksList';
import TaskDetailsCard from '@/features/driver/components/tasks/TaskDetailsCard';
import driverService from '@/services/driver';
import { useEffect, useState } from 'react';

const DriverTasks = () => {
  const [stats, setStats] = useState(null);
  const [route, setRoute] = useState(null);
  const [activeTask, setActiveTask] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const [statsResponse, routeResponse] = await Promise.all([
          driverService.getDashboard(),
          driverService.getRoute().catch((routeError) => {
            if (routeError.response?.status === 404) return null;
            throw routeError;
          }),
        ]);

        setStats(statsResponse.data?.data || null);
        const routePayload = routeResponse?.data?.data || null;
        setRoute(routePayload);
        setActiveTask(routePayload?.waypoints?.find((waypoint) => waypoint.waypointStatus !== 'completed') || routePayload?.waypoints?.[0] || null);
      } catch (loadError) {
        const status = loadError.response?.status;
        setError(
          status === 401
            ? 'انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.'
            : status === 403
              ? 'ليس لديك صلاحية للوصول إلى المهام اليومية.'
              : 'تعذر تحميل المهام اليومية. حاول مرة أخرى.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      
      {/* السايد بار يميناً كعمود حقيقي منفصل */}
      <Sidebar />

      {/* صفحة المهام يساراً بسكرول مستقل ناعم ومحمي تماماً من الكبس */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة بالتاريخ */}
            <TasksHeader date={route?.date} />

            {/* العدادات الخمسة */}
            <TasksStats data={stats} route={route} />

            {isLoading && <p className="text-sm text-gray-500">جارٍ تحميل المهام اليومية...</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* الجدول والكرت الجانبي */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <DetailedTasksList tasks={route?.waypoints} activeTaskId={activeTask?.waypointId} onTaskSelect={setActiveTask} />
              </div>
              <div className="lg:col-span-1">
                <TaskDetailsCard task={activeTask} waypoints={route?.waypoints} />
              </div>
            </div>
          </main>
        </div>

        {/* الفوتر */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🛡️</span>
          <span>احرص على سلامتك وسلامة البيئة.. كل مهمة تنجزها تصنع فرقاً!</span>
        </footer>
      </div>

    </div>
  );
};

export default DriverTasks;
