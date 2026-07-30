import React from 'react';
import Sidebar from '../components/driverLayout/Sidebar';
import DriverNavbar from '../components/driverLayout/DriverNavbar';
import HelpAccordion from '../components/driverHelp/HelpAccordion';
import { FiHelpCircle, FiShield } from 'react-icons/fi';

const DriverHelp = () => {
  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      {/* القائمة الجانبية الثابتة */}
      <Sidebar />

      {/* مساحة محتوى المساعدة بسكرول مستقل ناعم ومريح للعين */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1200px] mx-auto animate-fade-in-up">
            
            {/* عنوان الصفحة البسيط والبديل عن هيدر البحث المعقد */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-right">
              <div className="flex items-center gap-2.5 text-emerald-800">
                <FiHelpCircle className="text-2xl stroke-[2.5]" />
                <h1 className="text-xl font-black text-gray-800 tracking-tight">مركز المساعدة</h1>
              </div>
              <p className="text-xs text-gray-400 font-bold">هنا تجد حلولاً سريعة لأكثر المشاكل شيوعاً أثناء العمل</p>
            </div>

            {/* الأسئلة الشائعة وكروت الاتصال بأسفلها */}
            <HelpAccordion />

            {/* شريط نصائح السلامة الفخم */}
            <div className="bg-emerald-50/50 border border-emerald-100 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 shadow-[0_2px_8px_rgba(0,0,0,0.01)] text-emerald-800">
              <FiShield className="text-xl stroke-[2.5] text-emerald-600" />
              <p className="text-xs font-black tracking-wide">نصائح السلامة: سلامتك أولاً! تأكد دائماً من اتباع تعليمات السلامة أثناء القيادة والعمل الميداني.</p>
            </div>

          </main>
        </div>

        {/* ذيل الصفحة النظيف */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🌱</span>
          <span>مركز مساعدة السائقين لـ EcoCycle • دائماً في خدمتكم لوردية عمل مريحة ومستدامة.</span>
        </footer>
      </div>
    </div>
  );
};

export default DriverHelp;
