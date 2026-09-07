import { useState } from "react";
import { FaTrash, FaEye, FaTimes } from "react-icons/fa";

export default function UsersTable({ users, onToggleBan }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(users.length / pageSize));
  const activePage = Math.min(currentPage, totalPages);
  const visibleUsers = users.slice((activePage - 1) * pageSize, activePage * pageSize);

  const userAvatars = {
    1: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    2: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    4: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    5: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
  };

  const handleOpenDetails = (user) => {
    setSelectedUser(user);
    setIsDetailsOpen(true);
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
              visibleUsers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors duration-200 group">
                  <td className="py-4 px-6 text-center font-bold text-gray-400 text-base">{(activePage - 1) * pageSize + index + 1}</td>
                  
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
                      <button type="button" onClick={() => handleOpenDetails(user)} className="p-2.5 rounded-xl text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 active:scale-90 transition-all duration-150 cursor-pointer" title="عرض الملف"><FaEye className="text-sm" /></button>
                      <button type="button" onClick={() => onToggleBan?.(user.id)} className="p-2.5 rounded-xl text-gray-400 hover:text-red-600 hover:bg-red-50 active:scale-90 transition-all duration-150 cursor-pointer" title={user.status === "نشط" ? "حظر المستخدم" : "إلغاء الحظر"}><FaTrash className="text-sm" /></button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50/60 p-4 text-sm font-bold text-gray-400">
        <span>عرض {visibleUsers.length ? (activePage - 1) * pageSize + 1 : 0} إلى {visibleUsers.length ? (activePage - 1) * pageSize + visibleUsers.length : 0} من أصل {users.length} مستخدم</span>
        <div className="flex items-center gap-1" dir="ltr">
          <button type="button" disabled={activePage === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))} className="rounded-lg border border-gray-200 bg-white px-2 py-1 disabled:opacity-40">&lt;</button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button type="button" key={page} onClick={() => setCurrentPage(page)} className={`rounded-lg px-3 py-1 ${activePage === page ? "bg-emerald-600 text-white" : "border border-gray-200 bg-white text-gray-600"}`}>{page}</button>
          ))}
          <button type="button" disabled={activePage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))} className="rounded-lg border border-gray-200 bg-white px-2 py-1 disabled:opacity-40">&gt;</button>
        </div>
      </div>

      {isDetailsOpen && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">ملف المستخدم</h2>
              <button type="button" onClick={() => setIsDetailsOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700" aria-label="إغلاق"><FaTimes /></button>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <img src={userAvatars[selectedUser.id] || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"} alt={selectedUser.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <div className="font-black text-gray-900">{selectedUser.name}</div>
                  <div className="text-xs text-gray-400">{selectedUser.role}</div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">البريد</div><div className="font-bold">{selectedUser.email}</div></div>
                <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">النقاط</div><div className="font-bold">{selectedUser.points}</div></div>
                <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">الحالة</div><div className="font-bold">{selectedUser.status}</div></div>
                <div className="rounded-xl bg-gray-50 p-3"><div className="text-[10px] text-gray-400">الهاتف</div><div className="font-bold">{selectedUser.phone || "—"}</div></div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
