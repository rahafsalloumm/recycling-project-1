import { useEffect, useState } from 'react';
import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import HistoryHeader from '@/features/driver/components/history/HistoryHeader';
import HistoryStats from '@/features/driver/components/history/HistoryStats';
import HistoryFilter from '@/features/driver/components/history/HistoryFilter';
import HistoryTable from '@/features/driver/components/history/HistoryTable';
import driverService from '@/services/driver';

const DriverHistory = () => {
  const [historyStats, setHistoryStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadHistoryStats = async () => {
      try {
        const response = await driverService.getHistory();
        setHistoryStats(response.data?.data?.taskLogPage || null);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) {
          setErrorMessage('انتهت صلاحية تسجيل الدخول أو أن بيانات الدخول غير صحيحة.');
        } else if (status === 403) {
          setErrorMessage('هذا الحساب لا يملك صلاحية الوصول إلى سجل السائق.');
        } else {
          setErrorMessage('تعذر تحميل بيانات سجل المهام حاليًا.');
        }
        console.error('Failed to load driver history stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadHistoryStats();
  }, []);

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية الثابتة */}
      <Sidebar />

      {/* مساحة محتوى الأرشيف المستقل المحمي تماماً من التداخل */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة */}
            <HistoryHeader />

            {/* العدادات الخمسة العلوية للسجل */}
            {isLoading ? (
              <HistoryStats isLoading />
            ) : errorMessage ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-700" role="alert">
                {errorMessage}
              </div>
            ) : historyStats && typeof historyStats === 'object' ? (
              <HistoryStats stats={historyStats} />
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-bold text-gray-500">
                لا تتوفر بيانات سجل المهام حاليًا.
              </div>
            )}

            {/* شريط الفرز والتصدير */}
            <HistoryFilter />

            {/* الجدول الرئيسي الفسيح للأرشيف وتأثير الهوفر الأخضر */}
            <HistoryTable />

          </main>
        </div>

        {/* ذيل الصفحة */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>نظام أرشفة EcoCycle الذكي • كل وردية تغلقها بنجاح تدعم تقارير استدامة مدينتنا النظيفة.</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverHistory;
