import { FaHome, FaTruck, FaMapMarkerAlt, FaRecycle, FaGift, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const menuItems = [
  { icon: <FaHome />, label: 'لوحة المستخدم', path: '/user' },
  { icon: <FaTruck />, label: 'طلب استلام النفايات', path: '/user/request' },
  { icon: <FaMapMarkerAlt />, label: 'تتبع الطلبات', path: '/user/tracking' },
  { icon: <FaRecycle />, label: 'سجل إعادة التدوير', path: '/user/history' },
  { icon: <FaGift />, label: 'المكافآت', path: '/user/rewards' },
  { icon: <FaUser />, label: 'الملف الشخصي', path: '/user/profile' },
  { icon: <FaCog />, label: 'الإعدادات', path: '/user/settings' },
]

function Sidebar({ activePage }) {
  const navigate = useNavigate()

  return (
    <div dir="rtl" className="w-64 min-h-screen bg-white border-l border-gray-200 flex flex-col mt-16">
      
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[#e8f5e8] rounded-full flex items-center justify-center">
            <FaUser className="text-[#2d8a2d] text-xl" />
          </div>
          <div>
            <p className="font-bold text-[#1a3a1a]">رهف محمد</p>
            <p className="text-sm text-gray-500">مستخدم</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-right transition-colors ${
                  activePage === item.path.split('/user/')[1] || (activePage === 'dashboard' && item.path === '/user')
                    ? 'bg-[#e8f5e8] text-[#2d8a2d] font-bold'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 mt-4">
          <FaSignOutAlt />
          <span>تسجيل الخروج</span>
        </button>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-3 text-center">
          <p className="text-sm text-gray-500 mb-1">نقاطك الحالية</p>
          <p className="text-2xl font-bold text-[#2d8a2d]">2,450</p>
          <p className="text-xs text-gray-400">🌿</p>
          <button className="mt-2 w-full border border-[#2d8a2d] text-[#2d8a2d] py-1 rounded-lg text-sm hover:bg-[#e8f5e8]">
            عرض المكافآت
          </button>
        </div>
      </div>

    </div>
  )
}

export default Sidebar