import Sidebar from '../layout/Sidebar';
import DriverNavbar from '../layout/DriverNavbar';
import TasksHeader from '../components/tasks/TasksHeader';
import TasksStats from '../components/tasks/TasksStats';
import DetailedTasksList from '../components/tasks/DetailedTasksList';
import TaskDetailsCard from '../components/tasks/TaskDetailsCard';

const DriverTasks = () => {
  return (
    <div className="bg-[#f4f7f6] h-screen w-full flex overflow-hidden" dir="rtl">
      
      {/* السايد بار يميناً كعمود حقيقي منفصل */}
      <Sidebar />

      {/* صفحة المهام يساراً بسكرول مستقل ناعم ومحمي تماماً من الكبس */}
      <div className="flex-1 h-screen overflow-y-auto flex flex-col justify-between bg-[#f4f7f6]">
        <div>
          <DriverNavbar />

          <main className="p-6 space-y-6 max-w-[1600px] mx-auto animate-fade-in-up">
            
            {/* رأس الصفحة بالتاريخ */}
            <TasksHeader />

            {/* العدادات الخمسة */}
            <TasksStats />

            {/* الجدول والكرت الجانبي */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              <div className="lg:col-span-2">
                <DetailedTasksList />
              </div>
              <div className="lg:col-span-1">
                <TaskDetailsCard />
              </div>
            </div>
          </main>
        </div>

        {/* الفوتر */}
        <footer className="text-center text-xs text-emerald-700 font-bold py-5 border-t border-gray-100 bg-white flex items-center justify-center gap-2 shadow-[0_-2px_10px_rgba(0,0,0,0.01)] mt-auto w-full">
          <span>🛡️</span>
          <span>احرص على سلامتك وسلامة البيئة.. كل مهمة تنجزها تصنع فرقاً!</span>
        </footer>
      </div>

    </div>
  );
};

export default DriverTasks;
