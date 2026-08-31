import { FaBoxes, FaHistory } from "react-icons/fa";

export default function RewardsSidebar() {
  const usersAvatars = {
    1: "https://unsplash.com",
    2: "https://unsplash.com",
    3: "https://unsplash.com"
  };

  return (
    <div className="space-y-6" dir="rtl">
      
      {/* 1. فئات المكافآت كالصورة تماماً */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaBoxes className="text-emerald-600 text-xs" />
          <span>فئات المكافآت</span>
        </h4>
        <div className="space-y-2 text-xs font-bold text-gray-600">
          <div className="flex justify-between items-center bg-emerald-50 text-emerald-700 p-2.5 rounded-xl cursor-pointer"><span>🌿 الكل</span><span className="font-mono text-sm">24</span></div>
          <div className="flex justify-between items-center p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer"><span>🥤 منتجات صديقة للبيئة</span><span className="font-mono text-gray-400 text-sm">12</span></div>
          <div className="flex justify-between items-center p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer"><span>🏷️ قسائم خصم</span><span className="font-mono text-gray-400 text-sm">6</span></div>
          <div className="flex justify-between items-center p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer"><span>💳 بطاقات شرائية</span><span className="font-mono text-gray-400 text-sm">4</span></div>
          <div className="flex justify-between items-center p-2.5 hover:bg-gray-50 rounded-xl cursor-pointer"><span>🌳 مساهمات بيئية</span><span className="font-mono text-gray-400 text-sm">2</span></div>
        </div>
      </div>

      {/* 2. إحصائيات سريعة */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-3.5 border-b border-gray-50 pb-2">إحصائيات سريعة</h4>
        <div className="space-y-3 text-xs font-bold text-gray-500">
          <div className="flex justify-between"><span>إجمالي المكافآت:</span><span className="text-gray-900 font-mono">24</span></div>
          <div className="flex justify-between"><span>المكافآت النشطة:</span><span className="text-emerald-600 font-mono">22</span></div>
          <div className="flex justify-between"><span>المكافآت المتوقفة:</span><span className="text-red-500 font-mono">2</span></div>
          <div className="flex justify-between"><span>أعلى مكافأة مستخدمة:</span><span className="text-amber-600">كوبون خصم 20%</span></div>
        </div>
      </div>

      {/* 3. آخر عمليات الاستبدال بالصور الشخصية */}
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
        <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
          <FaHistory className="text-blue-500 text-xs" />
          <span>آخر عمليات الاستبدال</span>
        </h4>
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 text-xs">
            <img src={usersAvatars[1]} className="w-8 h-8 rounded-full object-cover shadow-sm" alt="" />
            <div className="w-full flex justify-between items-center">
              <div><p className="font-bold text-gray-900">أحمد محمد</p><p className="text-[10px] text-gray-400 font-medium">استبدل كوب صديق للبيئة</p></div>
              <span className="text-[10px] text-gray-400 font-medium">منذ 10 دقائق</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-xs">
            <img src={usersAvatars[2]} className="w-8 h-8 rounded-full object-cover shadow-sm" alt="" />
            <div className="w-full flex justify-between items-center">
              <div><p className="font-bold text-gray-900">سارة خالد</p><p className="text-[10px] text-gray-400 font-medium">استبدلت حقيبة قماشية</p></div>
              <span className="text-[10px] text-gray-400 font-medium">منذ 25 دقيقة</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
