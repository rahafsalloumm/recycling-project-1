import { useState } from 'react'
import { FaUser, FaLock, FaBell, FaInfoCircle, FaHeadset, FaSignOutAlt, FaChevronLeft, FaCog } from 'react-icons/fa'

function Toggle({ enabled, onChange }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors ${
        enabled ? 'bg-[#2d8a2d]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${
          enabled ? 'right-0.5' : 'right-5'
        }`}
      />
    </button>
  )
}

function Settings() {
  const [orderNotif, setOrderNotif] = useState(true)
  const [rewardNotif, setRewardNotif] = useState(true)

  return (
    <div dir="rtl" className="flex-1 p-6 bg-gray-50 min-h-screen overflow-y-auto mt-16">
      <div className="mb-6 text-center">
        <div className="flex items-center gap-2 justify-center">
          <FaCog className="text-[#2d8a2d] text-2xl" />
          <h1 className="text-2xl font-bold text-[#1a3a1a]">الإعدادات</h1>
        </div>
        <p className="text-gray-500 mt-1">إدارة تفضيلات حسابك</p>
      </div>

      <div className="space-y-4">

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#e8f5e8] rounded-full flex items-center justify-center text-[#2d8a2d]">
                <FaUser />
              </div>
              <div>
                <p className="font-bold text-[#1a3a1a]">معلومات الحساب</p>
                <p className="text-sm text-gray-500">عرض وتعديل معلومات حسابك الشخصية</p>
              </div>
            </div>
            <FaChevronLeft className="text-gray-300" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4 text-center">
            <div>
              <p className="text-xs text-gray-400 mb-1">رقم الهاتف</p>
              <p className="text-sm text-gray-700">+963 91 123 4567</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">البريد الإلكتروني</p>
              <p className="text-sm text-gray-700">rahaf.mohamed@example.com</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">الاسم الكامل</p>
              <p className="text-sm font-bold text-[#1a3a1a]">رهف محمد</p>
            </div>
          </div>
          <button className="border border-[#2d8a2d] text-[#2d8a2d] px-4 py-2 rounded-lg text-sm hover:bg-[#e8f5e8]">
            تعديل المعلومات
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f5e8] rounded-full flex items-center justify-center text-[#2d8a2d]">
              <FaLock />
            </div>
            <div>
              <p className="font-bold text-[#1a3a1a]">تغيير كلمة المرور</p>
              <p className="text-sm text-gray-500">قم بتغيير كلمة المرور الخاصة بحسابك</p>
            </div>
          </div>
          <FaChevronLeft className="text-gray-300" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#e8f5e8] rounded-full flex items-center justify-center text-[#2d8a2d]">
              <FaBell />
            </div>
            <div>
              <p className="font-bold text-[#1a3a1a]">الإشعارات</p>
              <p className="text-sm text-gray-500">إدارة تفضيلات الإشعارات التي تصلك</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">إشعارات حالة الطلبات</span>
              <Toggle enabled={orderNotif} onChange={() => setOrderNotif(!orderNotif)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">إشعارات المكافآت والعروض</span>
              <Toggle enabled={rewardNotif} onChange={() => setRewardNotif(!rewardNotif)} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f5e8] rounded-full flex items-center justify-center text-[#2d8a2d]">
              <FaInfoCircle />
            </div>
            <div>
              <p className="font-bold text-[#1a3a1a]">عن التطبيق</p>
              <p className="text-sm text-gray-500">معلومات عن التطبيق وسياسة الخصوصية</p>
            </div>
          </div>
          <FaChevronLeft className="text-gray-300" />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e8f5e8] rounded-full flex items-center justify-center text-[#2d8a2d]">
              <FaHeadset />
            </div>
            <div>
              <p className="font-bold text-[#1a3a1a]">تواصل معنا</p>
              <p className="text-sm text-gray-500">تحتاج إلى مساعدة؟ تواصل مع فريق الدعم</p>
            </div>
          </div>
          <FaChevronLeft className="text-gray-300" />
        </div>

        <div className="bg-red-50 rounded-xl shadow-sm p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-red-500">
            <FaSignOutAlt />
          </div>
          <div>
            <p className="font-bold text-red-500">تسجيل الخروج</p>
            <p className="text-sm text-red-400">تسجيل الخروج من حسابك الحالي</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Settings