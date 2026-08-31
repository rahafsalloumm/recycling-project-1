import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function BinsTable({ bins }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">معرف الحاوية</th>
              <th className="py-4 px-6">الموقع</th>
              <th className="py-4 px-6">المنطقة</th>
              <th className="py-4 px-6 text-center w-44">نسبة الامتلاء</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center">آخر تحديث</th>
              <th className="py-4 px-6 text-center w-32">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {bins.map((bin, index) => (
              <tr key={bin.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                <td className="py-4 px-6 font-mono font-bold text-gray-900 text-[14px]">
                  <span className="bg-gray-100 px-2 py-1 rounded-lg border border-gray-200/30">{bin.code}</span>
                </td>
                <td className="py-4 px-6 text-gray-800 font-bold text-[15px]">{bin.location}</td>
                <td className="py-4 px-6 text-gray-500 font-semibold">{bin.region}</td>
                
                {/* شريط التقدم التفاعلي (Progress Bar) الملون حسب النسبة كالصورة */}
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black text-gray-700 w-8 text-left">{bin.fillLevel}%</span>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden shadow-inner">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          bin.fillLevel >= 90 ? "bg-red-500" :
                          bin.fillLevel >= 60 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${bin.fillLevel}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                
                {/* الحالات اللونية الهادئة والمطابقة تماماً */}
                <td className="py-4 px-6 text-center">
                  <span className={`px-2.5 py-1 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 border ${
                    bin.status === "طبيعية" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" :
                    bin.status === "بحاجة للجمع" ? "bg-amber-50 text-amber-700 border-amber-100/50" : 
                    "bg-red-50 text-red-600 border-red-100/50"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      bin.status === "طبيعية" ? "bg-emerald-500" :
                      bin.status === "بحاجة للجمع" ? "bg-amber-500" : "bg-red-500 animate-pulse"
                    }`}></span>
                    {bin.status}
                  </span>
                </td>
                
                <td className="py-4 px-6 text-center text-gray-400 text-xs font-semibold">{bin.lastUpdate}</td>
                
                <td className="py-4 px-6 text-center">
                  <div className="flex items-center justify-center gap-1.5 opacity-90">
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض"><FaEye className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                    <button className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* أزرار الترقيم الصفلي */}
      <div className="p-4 bg-gray-50/60 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-400 font-bold select-none">
        <div>عرض <span className="text-gray-700 font-black">1</span> إلى <span className="text-gray-700 font-black">8</span> من أصل <span className="text-gray-700 font-black">42</span> حاوية</div>
        <div className="flex items-center gap-1" dir="ltr">
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&lt;</button>
          <button className="px-3 py-1 rounded bg-emerald-600 text-white font-black">1</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
          <button className="px-3 py-1 rounded bg-white border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
          <button className="px-2 py-1 rounded bg-white border border-gray-200 text-gray-400 hover:bg-gray-50">&gt;</button>
        </div>
      </div>
    </div>
  );
}
