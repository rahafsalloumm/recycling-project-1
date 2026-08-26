import React from 'react';
import Sidebar from '../components/driverLayout/Sidebar';
import DriverNavbar from '../components/driverLayout/DriverNavbar';
import ProfileHeader from '../components/driverProfile/ProfileHeader';
import ProfileCard from '../components/driverProfile/ProfileCard';
import ProfileAchievements from '../components/driverProfile/ProfileAchievements';
import InfoPersonal from '../components/driverProfile/InfoPersonal';
import InfoGrids from '../components/driverProfile/InfoGrids';

const DriverProfile = () => {
  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية الموحدة */}
      <Sidebar />

      {/* مساحة الملف الشخصي بسكرول مستقل هندسي محمي مية بالمية */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة */}
            <ProfileHeader />

            {/* 📊 توزيع الـ Grid المزدوج: الكروت الجانبية (يسار ثلث المساحة) وجداول البيانات والأجهزة (يمين ثلثي المساحة) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* العمود الأيمن العريض للجداول التفصيلية والإعدادات */}
              <div className="lg:col-span-2 space-y-6">
                <InfoPersonal />
                <InfoGrids />
              </div>

              {/* العمود الأيسر لكروت الإحصائيات والأوسمة الشخصية لأحمد أحمد */}
              <div className="lg:col-span-1 space-y-6">
                <ProfileCard />
                <ProfileAchievements />
              </div>

            </div>
          </main>
        </div>

        {/* ذيل الصفحة النظيف */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🌱</span>
          <span>لوحة إدارة السائقين الخاصة بـ EcoCycle • حافظ على تحديث بياناتك بشكل مستمر لضمان دقة العمل.</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverProfile;
