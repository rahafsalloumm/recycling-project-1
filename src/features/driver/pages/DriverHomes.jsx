import { useEffect, useState } from 'react';
import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import HomesHeader from '@/features/driver/components/homes/HomesHeader';
import HomesStats from '@/features/driver/components/homes/HomesStats';
import HomesFilter from '@/features/driver/components/homes/HomesFilter';
import HomesTable from '@/features/driver/components/homes/HomesTable';
import driverService from '@/services/driver';

const DriverHomes = () => {
  const [homesStats, setHomesStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadHomesStats = async () => {
      try {
        const response = await driverService.getHomes();
        setHomesStats(response.data?.data?.homeRequestsPage || null);
      } catch (loadError) {
        const status = loadError.response?.status;
        setError(
          status === 401
            ? 'انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.'
            : status === 403
              ? 'ليس لديك صلاحية للوصول إلى إحصائيات طلبات المنازل.'
              : loadError.response?.data?.message || 'تعذر تحميل إحصائيات طلبات المنازل. حاول مرة أخرى.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadHomesStats();
  }, []);

  const hasHomesStats = homesStats !== null && typeof homesStats === 'object';

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية الثابتة */}
      <Sidebar />

      {/* مساحة محتوى الصفحة مع سكرول مستقل محمي تماماً من التداخل الكلي للأبد */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة */}
            <HomesHeader />

            {isLoading && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm font-bold text-gray-500">
                جارٍ تحميل إحصائيات طلبات المنازل...
              </div>
            )}
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-bold text-red-600">
                {error}
              </div>
            )}
            {!isLoading && !error && !hasHomesStats && (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm font-bold text-amber-700">
                لا تتوفر إحصائيات لطلبات المنازل حاليًا.
              </div>
            )}
            {!isLoading && !error && hasHomesStats && (
              <>
                {/* العدادات الخمسة العلوية للطلبات السكنية */}
                <HomesStats stats={homesStats} />

                {/* شريط أدوات البحث والتصفية المتطور */}
                <HomesFilter />

                {/* الجدول الرئيسي الفسيح للبيانات وعناصر الـ Pagination */}
                <HomesTable />
              </>
            )}

          </main>
        </div>

        {/* ذيل الصفحة */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>مشروع EcoCycle لإعادة التدوير الذكي • كل طلب تستلمه بنجاح يساهم في بناء مجتمع مستدام ونظيف!</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverHomes;
