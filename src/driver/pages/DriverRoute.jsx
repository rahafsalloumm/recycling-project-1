import React from 'react';
import Sidebar from '../components/driverLayout/Sidebar';
import DriverNavbar from '../components/driverLayout/DriverNavbar';
import RouteHeader from '../components/driverRoute/RouteHeader';
import LiveMapSection from '../components/driverRoute/LiveMapSection';
import RouteProgressCard from '../components/driverRoute/RouteProgressCard';
import RouteStationsList from '../components/driverRoute/RouteStationsList';

const DriverRoute = () => {
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
            <RouteHeader />

            {/* 📊 توزيع الـ Grid المطور: الخريطة الكبيرة (يمين) وجدول تقدم المحطات السبعة (يسار) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* قسم الخريطة الرقمية والمؤشرات السفلية يأخذ ثلثي المساحة أفقياً */}
              <div className="lg:col-span-2">
                <LiveMapSection />
              </div>
              
              {/* قسم تقدم المسار وجدول المحطات السبعة يميناً يأخذ ثلث المساحة */}
              <div className="lg:col-span-1 space-y-6">
                <RouteProgressCard />
                <RouteStationsList />
              </div>

            </div>
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
