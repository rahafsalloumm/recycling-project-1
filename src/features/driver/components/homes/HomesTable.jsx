import { FiSmartphone, FiMapPin, FiChevronRight, FiChevronLeft } from 'react-icons/fi';

const HomesTable = () => {
  const requests = [
    { id: 'REQ-2024-028', name: 'محمد خالد', phone: '+963 91 123 4567', addr: 'حي الياسمين - شارع 8 المنزل رقم 25', type: 'بلاستيك', typeColor: 'text-blue-600 bg-blue-50 border-blue-100', weight: '15 كجم', time: '08:45 AM', status: 'قيد الانتظار', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'REQ-2024-027', name: 'سارة أحمد', phone: '+963 91 234 5678', addr: 'حي الزهور - شارع 12 المنزل رقم 47', type: 'ورق', typeColor: 'text-emerald-600 bg-emerald-50 border-emerald-100', weight: '20 كجم', time: '09:30 AM', status: 'في الطريق', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'REQ-2024-026', name: 'أحمد علي', phone: '+963 91 345 6789', addr: 'حي النور - شارع 5 المنزل رقم 16', type: 'زجاج', typeColor: 'text-purple-600 bg-purple-50 border-purple-100', weight: '12 كجم', time: '09:45 AM', status: 'في الطريق', statusColor: 'bg-blue-50 text-blue-600 border-blue-100' },
    { id: 'REQ-2024-025', name: 'ليلى محمود', phone: '+963 91 456 7890', addr: 'حي الحدائق - شارع 3 المنزل رقم 9', type: 'مختلط', typeColor: 'text-amber-600 bg-amber-50 border-amber-100', weight: '18 كجم', time: '08:15 AM', status: 'مكتمل', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
    { id: 'REQ-2024-024', name: 'خالد مصطفى', phone: '+963 91 567 8901', addr: 'حي الجامعة - شارع 10 المنزل رقم 33', type: 'إلكترونيات', typeColor: 'text-red-600 bg-red-50 border-red-100', weight: '10 كجم', time: '10:00 AM', status: 'قيد الانتظار', statusColor: 'bg-amber-50 text-amber-600 border-amber-100' },
    { id: 'REQ-2024-023', name: 'نور الدين', phone: '+963 91 678 9012', addr: 'حي الياسمين - شارع 6 المنزل رقم 19', type: 'بلاستيك', typeColor: 'text-blue-600 bg-blue-50 border-blue-100', weight: '25 كجم', time: '07:50 AM', status: 'مكتمل', statusColor: 'bg-emerald-50 text-emerald-600 border-emerald-100' },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-[11px] text-gray-400 font-extrabold tracking-wider bg-gray-50/50 rounded-xl">
              <th className="py-3.5 px-4 rounded-r-xl">رقم الطلب</th>
              <th className="py-3.5 px-4">العميل</th>
              <th className="py-3.5 px-4">العنوان</th>
              <th className="py-3.5 px-4">نوع النفايات</th>
              <th className="py-3.5 px-4">الوزن التقريبي</th>
              <th className="py-3.5 px-4">وقت الطلب</th>
              <th className="py-3.5 px-4">الحالة</th>
              <th className="py-3.5 px-4 rounded-l-xl text-center">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs font-bold text-gray-700">
            {requests.map((req, index) => (
              <tr 
                key={index} 
                // 💡 هنا السر: hover:bg-emerald-50/50 تمنحك اللون الأخضر الحركي المريح عند التأشير بالماوس فوراً، مع حافة جانبية مشعة
                className="transition-all duration-150 cursor-pointer border-r-4 border-transparent hover:bg-emerald-50/50 hover:border-emerald-600 group"
              >
                <td className="py-4 px-4 font-sans text-emerald-600/90 tracking-wide group-hover:text-emerald-700 group-hover:font-black">{req.id}</td>
                <td className="py-4 px-4">
                  <div className="space-y-0.5">
                    {/* الاسم يضاء ويصبح غامقاً عند تمرير الماوس فوق السطر */}
                    <p className="text-gray-800 group-hover:text-emerald-950 group-hover:font-black transition-colors">{req.name}</p>
                    <p className="text-[10px] text-gray-400 font-sans font-medium flex items-center gap-1"><FiSmartphone /> {req.phone}</p>
                  </div>
                </td>
                <td className="py-4 px-4 max-w-[200px] truncate">
                  <div className="flex items-center gap-1">
                    <FiMapPin className="text-gray-300 group-hover:text-emerald-500 transition-colors shrink-0" />
                    <span className="truncate">{req.addr}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border tracking-wide block w-fit ${req.typeColor}`}>
                    {req.type}
                  </span>
                </td>
                <td className="py-4 px-4 font-sans text-gray-600 font-extrabold">{req.weight}</td>
                <td className="py-4 px-4 font-sans text-gray-400 font-medium">
                  <p>{req.time}</p>
                  <p className="text-[9px] text-gray-300 mt-0.5">اليوم</p>
                </td>
                <td className="py-4 px-4">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-xl border tracking-wide block w-fit min-w-[80px] text-center ${req.statusColor}`}>
                    {req.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-center">
                  <button className="text-[10px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-3 py-1.5 rounded-lg border border-emerald-100/50 shadow-sm transition-all active:scale-95 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600">
                    عرض التفاصيل
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* شريط الترقيم السفلي */}
      <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-50 text-xs font-bold text-gray-400">
        <span className="text-[11px] font-medium">عرض 1 إلى 6 من أصل 28 طلب</span>
        
        <div className="flex items-center gap-1 font-sans">
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100"><FiChevronRight /></button>
          <button className="w-7 h-7 bg-emerald-600 text-white rounded-lg flex items-center justify-center shadow-sm">1</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">2</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">3</button>
          <span className="px-1 text-gray-300">...</span>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-50 text-gray-600">5</button>
          <button className="w-7 h-7 border border-gray-100 rounded-lg flex items-center justify-center bg-gray-50 text-gray-400 hover:bg-gray-100"><FiChevronLeft /></button>
        </div>
      </div>
    </div>
  );
};

export default HomesTable;
