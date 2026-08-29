import {
  FaFileAlt,
  FaSyncAlt,
  FaRecycle,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaHourglassHalf,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaTint,
  FaBoxOpen,
  FaWineBottle,
  FaTrashAlt,
  FaLightbulb,
  FaChartLine,
} from 'react-icons/fa'

const statsCards = [
  {
    label: 'إجمالي الطلبات',
    value: 5,
    icon: <FaFileAlt />,
    color: 'bg-green-100 text-green-600',
    link: 'عرض الكل',
    linkColor: 'text-green-600',
  },
  {
    label: 'طلبات مكتملة',
    value: 3,
    icon: <FaSyncAlt />,
    color: 'bg-blue-100 text-blue-600',
    link: 'عرض الكل',
    linkColor: 'text-blue-600',
  },
  {
    label: 'إجمالي النفايات المعاد تدويرها',
    value: '20 كغ',
    icon: <FaRecycle />,
    color: 'bg-purple-100 text-purple-600',
    link: 'عرض التفاصيل',
    linkColor: 'text-purple-600',
  },
  {
    label: 'إجمالي النقاط',
    value: '2,450',
    icon: <FaStar />,
    color: 'bg-yellow-100 text-yellow-600',
    link: 'عرض المكافآت',
    linkColor: 'text-green-600',
  },
]

const typeIcons = {
  بلاستيك: <FaTint />,
  ورق: <FaBoxOpen />,
  زجاج: <FaWineBottle />,
  معادن: <FaTrashAlt />,
}

const statusStyles = {
  مكتمل: { color: 'bg-green-100 text-green-600', icon: <FaCheckCircle /> },
  'قيد التنفيذ': { color: 'bg-blue-100 text-blue-600', icon: <FaTruck /> },
  'قيد المراجعة': { color: 'bg-yellow-100 text-yellow-600', icon: <FaHourglassHalf /> },
}

const recentOrders = [
  { id: 1028, status: 'مكتمل', date: '22 مايو 2026', time: '08:00 PM', location: 'حلب، شارع الجامعة', type: 'بلاستيك', weight: '5 كغ' },
  { id: 1027, status: 'قيد التنفيذ', date: '20 مايو 2026', time: '09:00 AM', location: 'حلب، حي الميدان', type: 'ورق', weight: '3 كغ' },
  { id: 1026, status: 'قيد المراجعة', date: '15 مايو 2026', time: '11:15 AM', location: 'حلب، حي الشيخ مقصود', type: 'زجاج', weight: '4 كغ' },
  { id: 1025, status: 'مكتمل', date: '18 أبريل 2026', time: '02:30 PM', location: 'حلب، حي العزيزية', type: 'معادن', weight: '6 كغ' },
]

const circleCircumference = 2 * Math.PI * 54
const monthlyPoints = 650
const monthlyGoal = 1000
const circleOffset = circleCircumference * (1 - monthlyPoints / monthlyGoal)

function UserDashboard() {
  return (
    <div dir="rtl" className="flex-1 p-6 bg-gray-50 mt-14">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1a3a1a]">مرحبًا رهف! 👋</h1>
        <p className="text-gray-500 mt-1">🌱 أنت تقوم بعمل رائع من أجل بيئة أفضل</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-2xl font-bold text-[#1a3a1a]">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <button className={`text-sm font-medium ${stat.linkColor} hover:underline`}>
              {stat.link}
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1a3a1a]">الطلبات الأخيرة</h2>
            <button className="text-sm text-green-600 hover:underline">عرض الكل</button>
          </div>
          <div>
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${statusStyles[order.status].color}`}>
                  {statusStyles[order.status].icon}
                  {order.status}
                </span>
                <div className="text-xs text-gray-400 text-center">
                  <p>{order.date}</p>
                  <p>{order.time}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-[#2d8a2d]">{typeIcons[order.type]}</span>
                  <span>{order.type}</span>
                  <span className="text-gray-400">{order.weight}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <FaMapMarkerAlt className="text-gray-400 text-xs" />
                  <span>{order.location}</span>
                </div>
                <FaChevronLeft className="text-gray-300" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-[#1a3a1a]">نقاطك هذا الشهر</h2>
            <span>🌱</span>
          </div>
          <div className="relative w-40 h-40 mx-auto">
            <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e5e7eb" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="#2d8a2d"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circleCircumference}
                strokeDashoffset={circleOffset}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-3xl font-bold text-[#1a3a1a]">{monthlyPoints}</p>
              <p className="text-sm text-gray-500">نقطة</p>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">
            من {monthlyGoal.toLocaleString('en-US')} نقطة للحصول على مكافأة
          </p>
          <button className="mt-4 w-full bg-[#2d8a2d] text-white py-2 rounded-lg hover:bg-[#1a5c1a] transition-colors">
            عرض المكافآت
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaLightbulb className="text-[#2d8a2d]" />
            <h2 className="font-bold text-[#1a3a1a]">نصائح بيئية اليوم</h2>
          </div>
          <div className="bg-[#e8f5e8] rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-500 text-xl shrink-0">
              <FaLightbulb />
            </div>
            <p className="text-gray-700 text-sm">
              إعادة تدوير زجاجة واحدة توفر الطاقة اللازمة لتشغيل مصباح LED لمدة 6 ساعات.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <FaChartLine className="text-[#2d8a2d]" />
            <h2 className="font-bold text-[#1a3a1a]">تأثيرك الإيجابي</h2>
          </div>
          <p className="text-gray-700 text-sm">
            أنت ضمن أفضل <span className="font-bold text-[#2d8a2d]">20%</span> من المستخدمين
          </p>
          <p className="text-gray-500 text-sm mt-2">🌱 استمر في صنع الفرق!</p>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard