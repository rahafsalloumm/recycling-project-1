import { FiCheckCircle, FiClock, FiStar, FiCamera } from 'react-icons/fi';

const ProfileCard = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)] flex flex-col items-center text-center group hover:shadow-[0_8px_24px_rgba(0,0,0,0.02)] transition-shadow duration-300" dir="rtl">
      
      {/* الصورة الشخصية مع أيقونة الكاميرا التفاعلية للهوفر */}
      <div className="relative w-28 h-28 mb-4">
        <img 
          src="https://unsplash.com" 
          alt="Driver Avatar" 
          className="w-full h-full rounded-full object-cover ring-4 ring-emerald-500/10 shadow-md group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute bottom-1 left-1 bg-emerald-600 text-white p-2 rounded-full border-2 border-white shadow cursor-pointer hover:bg-emerald-700 transition-colors">
          <FiCamera className="text-xs" />
        </div>
      </div>

      <h2 className="text-base font-black text-gray-800 tracking-tight">أحمد أحمد</h2>
      <p className="text-xs font-bold text-gray-400 mt-0.5">سائق شاحنة رقم 7</p>
      
      {/* شارة متصل المستقرة */}
      <div className="flex items-center gap-1.5 mt-2 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow shadow-emerald-500"></span>
        <span className="text-[10px] font-black text-emerald-700">متصل</span>
      </div>

      {/* العدادات الموزعة تحت بعضها تماماً كالصورة */}
      <div className="w-full mt-6 space-y-3.5 border-t border-gray-50 pt-5 text-xs font-bold text-gray-600">
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiCheckCircle className="text-emerald-500" /> إجمالي المهام المكتملة</span>
          <span className="font-sans font-black text-slate-800">248</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiClock className="text-amber-500" /> ساعات العمل</span>
          <span className="font-sans font-black text-slate-800">120 ساعة</span>
        </div>
        <div className="flex justify-between items-center bg-gray-50/50 px-3 py-2 rounded-xl">
          <span className="text-gray-400 flex items-center gap-2"><FiStar className="text-yellow-500 fill-yellow-500" /> تقييم الأداء</span>
          <span className="font-sans font-black text-slate-800 flex items-center gap-1">4.8 <span className="text-yellow-500 text-[10px]">⭐</span></span>
        </div>
      </div>

    </div>
  );
};

export default ProfileCard;
