import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import ProfileHeader from '@/features/driver/components/profile/ProfileHeader';
import ProfileCard from '@/features/driver/components/profile/ProfileCard';
import InfoPersonal from '@/features/driver/components/profile/InfoPersonal';
import InfoGrids from '@/features/driver/components/profile/InfoGrids';

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

            {/* 📊 التوزيع المحدث: جعل الكروت العلوية في شبكة متناسقة والكروت الثلاثة بالأسفل ممتدة بالكامل */}
            <div className="space-y-6">
              
              {/* القسم العلوي: كرت البيانات الشخصية وبجانبه كرت الإحصائيات (ProfileCard) */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                <div className="lg:col-span-2">
                  <InfoPersonal />
                </div>
                <div className="lg:col-span-1">
                  <ProfileCard />
                </div>
              </div>

              {/* القسم السفلي: الكروت الثلاثة ممتدة بكامل العرض لتملأ الفراغ بشكل ممتاز */}
              <div className="w-full">
                <InfoGrids />
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
