import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import RouteHeader from '@/features/driver/components/route/RouteHeader';
import LiveMapSection from '@/features/driver/components/route/LiveMapSection';
import RouteProgressCard from '@/features/driver/components/route/RouteProgressCard';
import RouteStationsList from '@/features/driver/components/route/RouteStationsList';
import driverService from '@/services/driver';
import { useEffect, useState } from 'react';

const DriverRoute = () => {
  const [route, setRoute] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRoute, setHasRoute] = useState(true);

  useEffect(() => {
    const loadRoute = async () => {
      try {
        const response = await driverService.getRoute();
        setRoute(response.data?.data || null);
        setHasRoute(Boolean(response.data?.data));
      } catch (loadError) {
        if (loadError.response?.status === 404) {
          setRoute(null);
          setHasRoute(false);
          return;
        }
        const status = loadError.response?.status;
        setError(
          status === 401
            ? 'انتهت جلسة الدخول. يرجى تسجيل الدخول مرة أخرى.'
            : status === 403
              ? 'ليس لديك صلاحية للوصول إلى مسار السائق.'
              : loadError.response?.data?.message || 'تعذر تحميل المسار الحالي. حاول مرة أخرى.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadRoute();
  }, []);

  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية المحدثة الثابتة باليمين */}
      <Sidebar />

      {/* منطقة محتوى صفحة تتبع المسار، تأخذ باقي مساحة الشاشة وبسكرول مستقل ناعم */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة بالتاريخ والبوصلة */}
            {(isLoading || hasRoute) && <RouteHeader route={route} />}
            {isLoading && (
              <div className="rounded-2xl border border-gray-100 bg-white p-6 text-sm font-bold text-gray-500">
                جارٍ تحميل المسار الحالي...
              </div>
            )}
            {!isLoading && !hasRoute && !error && (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm font-bold text-amber-700">
                لا يوجد مسار نشط حاليًا.
              </div>
            )}
            {error && <p className="rounded-2xl border border-red-100 bg-red-50 p-6 text-sm font-bold text-red-600">{error}</p>}

            {/* 📊 توزيع الـ Grid المطور: الخريطة الكبيرة (يمين) وجدول تقدم المحطات السبعة (يسار) */}
            {!isLoading && hasRoute && !error && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                {/* قسم الخريطة الرقمية والمؤشرات السفلية يأخذ ثلثي المساحة أفقياً */}
                <div className="lg:col-span-2">
                  <LiveMapSection route={route} />
                </div>
                {/* قسم تقدم المسار وجدول المحطات السبعة يميناً يأخذ ثلث المساحة */}
                <div className="lg:col-span-1 space-y-6">
                  <RouteProgressCard progress={route?.progress} />
                  <RouteStationsList waypoints={route?.waypoints} />
                </div>
              </div>
            )}
          </main>
        </div>

        {/* ذيل الصفحة الأنيق والمحفز للبيئة */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>نصيحة صديقة للبيئة: قيادتك المتزنة والآمنة تساعد على تقليل استهلاك الوقود وحماية البيئة.</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverRoute;
