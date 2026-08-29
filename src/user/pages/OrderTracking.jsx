import { FaCheckCircle, FaTruck, FaClock, FaFileAlt, FaMapMarkerAlt, FaTrash, FaWeight, FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { useState } from 'react'

const stats = [
  { label: 'إجمالي الطلبات', value: 5, icon: <FaFileAlt />, color: 'bg-purple-100 text-purple-500' },
  { label: 'قيد المراجعة', value: 1, icon: <FaClock />, color: 'bg-yellow-100 text-yellow-500' },
  { label: 'قيد التنفيذ', value: 1, icon: <FaTruck />, color: 'bg-blue-100 text-blue-500' },
  { label: 'مكتملة', value: 3, icon: <FaCheckCircle />, color: 'bg-green-100 text-green-500' },
]

const orders = [
  {
    id: 1028,
    status: 'مكتمل',
    statusColor: 'bg-green-100 text-green-600',
    date: '22 مايو 2026 - 20:00 AM',
    location: 'حلب، شارع الجامعة',
    type: 'بلاستيك',
    weight: '5 كغ',
    steps: ['قيد المراجعة', 'تم القبول', 'في طريق', 'تم الاستلام'],
  },
  {
    id: 1027,
    status: 'قيد التنفيذ',
    statusColor: 'bg-blue-100 text-blue-600',
    date: '20 مايو 2026 - 09:00 AM',
    location: 'حلب، حي الميدان',
    type: 'ورق',
    weight: '3 كغ',
    steps: ['قيد المراجعة', 'تم القبول', 'في طريق', 'تم الاستلام'],
  },
  {
    id: 1026,
    status: 'قيد المراجعة',
    statusColor: 'bg-yellow-100 text-yellow-600',
    date: '15 مايو 2026 - 11:15 AM',
    location: 'حلب، حي الشيخ مقصود',
    type: 'زجاج',
    weight: '4 كغ',
    steps: ['قيد المراجعة', 'تم القبول', 'في طريق', 'تم الاستلام'],
  },
  {
    id: 1025,
    status: 'مكتمل',
    statusColor: 'bg-green-100 text-green-600',
    date: '18 أبريل 2026 - 02:30 PM',
    location: 'حلب، حي العزيزية',
    type: 'معادن',
    weight: '6 كغ',
    steps: ['قيد المراجعة', 'تم القبول', 'في طريق', 'تم الاستلام'],
  },
  {
    id: 1024,
    status: 'مكتمل',
    statusColor: 'bg-green-100 text-green-600',
    date: '12 أبريل 2026 - 04:20 PM',
    location: 'حلب، حي الحمدانية',
    type: 'بلاستيك',
    weight: '2 كغ',
    steps: ['قيد المراجعة', 'تم القبول', 'في طريق', 'تم الاستلام'],
  },
]

function OrderTracking() {
  const [expandedOrder, setExpandedOrder] = useState(1028)

  return (
    <div dir="rtl" className="flex-1 p-6 bg-gray-50 mt-14">
      
      <div className="mb-6">
        <div className="flex items-center gap-2 justify-center">
          <FaMapMarkerAlt className="text-[#2d8a2d] text-2xl" />
          <h1 className="text-2xl font-bold text-[#1a3a1a]">تتبع الطلبات</h1>
        </div>
        <p className="text-gray-500 text-center mt-1">يمكنك متابعة حالة طلبات استلام النفايات التي قمت بها</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold text-[#1a3a1a]">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div 
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              <div className="flex items-center gap-3">
                {expandedOrder === order.id ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-[#2d8a2d]">طلب #{order.id}</p>
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <FaClock className="text-xs" />
                    {order.date}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>

            {expandedOrder === order.id && order.location && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center text-gray-400">
                    🗺️ الخريطة
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaMapMarkerAlt className="text-[#2d8a2d]" />
                      <div>
                        <p className="text-xs text-gray-400">الموقع</p>
                        <p className="text-sm">{order.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaTrash className="text-[#2d8a2d]" />
                      <div>
                        <p className="text-xs text-gray-400">نوع النفايات</p>
                        <p className="text-sm">{order.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FaWeight className="text-[#2d8a2d]" />
                      <div>
                        <p className="text-xs text-gray-400">الوزن التقريبي</p>
                        <p className="text-sm">{order.weight}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-4 right-4 left-4 h-1 bg-[#2d8a2d]"></div>
                    {order.steps.map((step, index) => (
                      <div key={index} className="flex flex-col items-center gap-1 relative z-10">
                        <div className="w-8 h-8 rounded-full bg-[#2d8a2d] flex items-center justify-center">
                          <FaCheckCircle className="text-white text-sm" />
                        </div>
                        <p className="text-xs text-gray-500">{step}</p>
                        <p className="text-xs text-gray-400">20 مايو</p>
                      </div>
                    ))}
                  </div>
                </div>

                <button className="mt-4 w-full bg-[#2d8a2d] text-white py-2 rounded-lg hover:bg-[#1a5c1a] transition-colors">
                  عرض التفاصيل
                </button>
              </div>
            )}
          </div>
        ))}
        <p className="text-center text-gray-400 text-sm py-2">🌿 لا توجد المزيد من الطلبات</p>
      </div>

    </div>
  )
}

export default OrderTracking