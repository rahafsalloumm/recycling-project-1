import React from 'react';
import Sidebar from '../components/driverLayout/Sidebar';
import DriverNavbar from '../components/driverLayout/DriverNavbar';
import StatCard from '../components/driverHome/StatCard';
import MapSection from '../components/driverHome/MapSection';
import TasksList from '../components/driverHome/TasksList';
import DashboardGrid from '../components/driverHome/DashboardGrid';

import { FiBattery, FiNavigation, FiClock, FiCheckCircle, FiFileText } from 'react-icons/fi';

const DriverDashboard = () => {
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
              <StatCard title="الوقود المتبقي" value="68%" subtext="تقريباً" icon={<FiBattery />} colorClass="bg-purple-50 text-purple-600 border border-purple-100/50" />
              <StatCard title="المسافة المتبقية" value="24.6" subtext="كم" icon={<FiNavigation />} colorClass="bg-blue-50 text-blue-600 border border-blue-100/50" />
              <StatCard title="المهام المتبقية" value="9" subtext="مهمة" icon={<FiClock />} colorClass="bg-amber-50 text-amber-600 border border-amber-100/50" />
              <StatCard title="المهام المكتملة" value="3" subtext="حتى الآن" icon={<FiCheckCircle />} colorClass="bg-emerald-50 text-emerald-600 border border-emerald-100/50" />
              <StatCard title="إجمالي المهام" value="12" subtext="مهمة اليوم" icon={<FiFileText />} colorClass="bg-teal-50 text-teal-600 border border-teal-100/50" />
            </div>

            {/* الخريطة وقائمة المهام المنظمة */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <MapSection />
              <TasksList />
            </div>

            {/* الجريد السفلي */}
            <DashboardGrid />
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
