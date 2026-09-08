import { useEffect, useState } from 'react';
import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import ProfileHeader from '@/features/driver/components/profile/ProfileHeader';
import ProfileCard from '@/features/driver/components/profile/ProfileCard';
import InfoPersonal from '@/features/driver/components/profile/InfoPersonal';
import InfoGrids from '@/features/driver/components/profile/InfoGrids';
import driverService from '@/services/driver';

const DriverProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await driverService.getProfile();
        setProfile(response.data?.user || null);
      } catch (error) {
        const status = error.response?.status;
        if (status === 401) {
          setErrorMessage('انتهت صلاحية تسجيل الدخول أو أن بيانات الدخول غير صحيحة.');
        } else if (status === 403) {
          setErrorMessage('لا تملك الصلاحية للوصول إلى بيانات الملف الشخصي.');
        } else if (status === 404) {
          setErrorMessage('لم يتم العثور على بيانات الملف الشخصي.');
        } else {
          setErrorMessage('تعذر تحميل بيانات الملف الشخصي حاليًا.');
        }
        console.error('Failed to load driver profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileUpdated = (updatedFields) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...updatedFields,
    }));
  };

  const handleProfileImageUpdated = (updatedProfile) => {
    setProfile((currentProfile) => ({
      ...currentProfile,
      ...updatedProfile,
    }));
  };

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

            {isLoading ? (
              <div className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 text-sm font-bold text-emerald-700" role="status">
                جارٍ تحميل بيانات الملف الشخصي...
              </div>
            ) : errorMessage ? (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-bold text-red-700" role="alert">
                {errorMessage}
              </div>
            ) : profile && typeof profile === 'object' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                  <div className="lg:col-span-2">
                    <InfoPersonal profile={profile} onProfileUpdated={handleProfileUpdated} />
                  </div>
                  <div className="lg:col-span-1">
                    <ProfileCard profile={profile} onProfileImageUpdated={handleProfileImageUpdated} />
                  </div>
                </div>

                <div className="w-full">
                  <InfoGrids profile={profile} />
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-gray-100 bg-white px-5 py-4 text-sm font-bold text-gray-500">
                لا تتوفر بيانات الملف الشخصي حاليًا.
              </div>
            )}
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
