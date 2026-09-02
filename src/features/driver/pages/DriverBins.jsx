import Sidebar from '@/features/driver/layout/Sidebar';
import DriverNavbar from '@/features/driver/layout/DriverNavbar';
import BinsHeader from '@/features/driver/components/bins/BinsHeader';
import BinsStats from '@/features/driver/components/bins/BinsStats';
import BinsMapSection from '@/features/driver/components/bins/BinsMapSection';
import BinsChartSection from '@/features/driver/components/bins/BinsChartSection';
import BinsTableSection from '@/features/driver/components/bins/BinsTableSection';

const DriverBins = () => {
  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية الثابتة */}
      <Sidebar />

      {/* مساحة محتوى صفحة الحاويات بسكرول مستقل ومنع التداخل نهائياً */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة والوصف */}
            <BinsHeader />

            {/* كروت العدادات الخمسة العلوية للحاويات */}
            <BinsStats />

            {/* القسم الأوسط: خريطة المواقع الجغرافية (يمين) ومخطط النسب والنسب المئوية (يسار) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BinsMapSection />
              <BinsChartSection />
            </div>

            {/* الجدول السفلي لعرض وتصفية تفاصيل الحاويات وشريط الامتلاء */}
            <BinsTableSection />

          </main>
        </div>

        {/* ذيل الصفحة المحفز والمنظم */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🍃</span>
          <span>مشروع EcoCycle لإعادة التدوير الذكي • نعتمد على دقة مؤشراتك لتنظيف مدينتنا بطرق مستدامة.</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverBins;
