import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function UsersTable({ users }) {
  // صور شخصية افتراضية متنوعة للمستخدمين لمنح الجدول واقعية كاملة
  const userAvatars = {
    1: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    5: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden text-right transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-gray-50/70 border-b border-gray-100 text-gray-400 text-sm font-bold tracking-wide select-none">
              <th className="py-4 px-6 text-center w-16">#</th>
              <th className="py-4 px-6">المستخدم</th>
              <th className="py-4 px-6">البريد الإلكتروني</th>
              <th className="py-4 px-6 text-center">الدور</th>
              <th className="py-4 px-6 text-center">النقاط</th>
              <th className="py-4 px-6 text-center">الحالة</th>
              <th className="py-4 px-6 text-center w-32">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-50 text-gray-700 font-medium">
            {users.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-10 text-gray-400 font-bold text-base">لا يوجد مستخدمين يطابقون بحثك الحالي.</td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                  <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{index + 1}</td>
                  
                  {/* عمود المستخدم بالصورة الشخصية وحجم الخط المكبر */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={userAvatars[user.id] || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} 
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors duration-150 text-[15px]">{user.name}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-4 px-6 text-gray-500 font-semibold text-base">{user.email}</td>
                  
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-xl bg-gray-100 text-gray-600 font-bold text-xs border border-gray-200/20">
                      {user.role}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6 text-center font-black text-amber-600 text-base font-mono">{user.points}</td>
                  
                  {/* ألوان هادئة ومتزنة مع تأثير النبض الحي للنشط */}
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 shadow-sm border ${
                      user.status === "نشط" ? "bg-emerald-50 text-emerald-700 border-emerald-100/50" : "bg-red-50 text-red-600 border-red-100/50"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.status === "نشط" ? "bg-emerald-500 animate-pulse" : "bg-red-500"
                      }`}></span>
                      {user.status}
                    </span>
                  </td>
                  
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-1.5 opacity-90">
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض الملف"><FaEye className="text-sm" /></button>
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 active:scale-90 transition-all duration-150 cursor-pointer" title="تعديل"><FaEdit className="text-sm" /></button>
                      <button className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title="حذف"><FaTrash className="text-sm" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
