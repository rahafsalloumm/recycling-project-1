import React from 'react';
import { FiUser } from 'react-icons/fi';

const ProfileHeader = () => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="text-right space-y-1">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiUser className="text-2xl stroke-[2.5]" />
          <h1 className="text-xl font-black text-gray-800 tracking-tight">الملف الشخصي</h1>
        </div>
        <p className="text-xs text-gray-400 font-bold">إدارة معلوماتك الشخصية، وبيانات المركبة والتفضيلات</p>
      </div>
    </div>
  );
};

export default ProfileHeader;
