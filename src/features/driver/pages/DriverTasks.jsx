import { useEffect, useState } from 'react';
import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import TasksHeader from '@/features/driver/components/tasks/TasksHeader';
import TasksStats from '@/features/driver/components/tasks/TasksStats';
import DetailedTasksList from '@/features/driver/components/tasks/DetailedTasksList';
import TaskDetailsCard from '@/features/driver/components/tasks/TaskDetailsCard';
import driverService from '@/services/driver';

const DriverTasks = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadTasksStats = async () => {
      try {
        const response = await driverService.getStats();
        setStats(response?.data || response);
      } catch (err) {
        setError(err?.message || 'تعذر تحميل بيانات المهام');
      } finally {
        setLoading(false);
      }
    };

    loadTasksStats();
  }, []);

  const taskStats = stats?.taskLogPage || {};

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      <Sidebar />

      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            {loading ? (
              <div className="text-center text-gray-500 py-10">جاري تحميل المهام...</div>
            ) : error ? (
              <div className="text-center text-red-500 py-10">{error}</div>
            ) : (
              <>
                <TasksHeader />

                <TasksStats />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <DetailedTasksList />
                  </div>
                  <div className="lg:col-span-1">
                    <TaskDetailsCard />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>

        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🛡️</span>
          <span>احرص على سلامتك وسلامة البيئة.. كل مهمة تنجزها تصنع فرقاً!</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverTasks;
