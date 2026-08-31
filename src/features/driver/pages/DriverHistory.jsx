import Sidebar from '../layout/Sidebar';
import DriverNavbar from '../layout/DriverNavbar';
import HistoryHeader from '../components/history/HistoryHeader';
import HistoryStats from '../components/history/HistoryStats';
import HistoryFilter from '../components/history/HistoryFilter';
import HistoryTable from '../components/history/HistoryTable';

const DriverHistory = () => {
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
            <HistoryStats />

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
