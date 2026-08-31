import Sidebar from '../layout/Sidebar';
import DriverNavbar from '../layout/DriverNavbar';
import HomesHeader from '../components/homes/HomesHeader';
import HomesStats from '../components/homes/HomesStats';
import HomesFilter from '../components/homes/HomesFilter';
import HomesTable from '../components/homes/HomesTable';

const DriverHomes = () => {
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

            {/* العدادات الخمسة العلوية للطلبات السكنية */}
            <HomesStats />

            {/* شريط أدوات البحث والتصفية المتطور */}
            <HomesFilter />

            {/* الجدول الرئيسي الفسيح للبيانات وعناصر الـ Pagination */}
            <HomesTable />

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
