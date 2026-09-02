import Navbar from '@/components/layout/Navbar'

// مصفوفة البيانات الأولى للخدمات
const services = [
  { id: 1, title: "استلام النفايات من المنزل", items: ["احجز موعد الاستلام بسهولة", "اختر نوع وكمية النفايات", "تواصل مع فريقنا في أي وقت"], image: "/images/1.png" },
  { id: 2, title: "نظام المكافآت والنقاط", items: ["اجمع نقاطاً مقابل كل عملية تدوير", "استبدل النقاط بمكافآت وقسائم", "عروض ومكافآت حصرية"], image: "/images/2.png" },
  { id: 3, title: "تتبع الطلبات", items: ["تابع حالة طلبك لحظة بلحظة", "إشعارات فورية بالتحديثات", "شفافية كاملة لكل الطلبات"], image: "/images/3.png" },
  { id: 4, title: "إعادة تدوير للشركات", items: ["حلول مخصصة للشركات", "استلام دوري للنفايات", "تقارير وإحصائيات مفصلة"], image: "/images/4.png" },
  { id: 5, title: "التوعية البيئية", items: ["نصائح يومية للحفاظ على البيئة", "معلومات عن أهمية إعادة التدوير", "مقالات وفيديوهات توعوية"], image: "/images/5.png" },
  { id: 6, title: "دعم العملاء", items: ["تواصل معنا في أي وقت", "رد سريع على استفساراتك", "مساعدة عبر جميع القنوات"], image: "/images/6.png" },
]

// مصفوفة البيانات الثانية للخدمات الجديدة
const newServices = [
  { id: 7, title: "الحاويات الذكية", items: ["مراقبة لمستوى الامتلاء", "بيانات لحظية عبر IoT", "تنبيهات عند امتلاء الحاويات"], image: "/images/7.png" },
  { id: 8, title: "تحسين مسارات الجمع", items: ["مسارات ذكية تقلل الوقت والتكلفة", "تحديث تلقائي حسب حالة الحاويات", "كفاءة أعلى وخدمة أسرع"], image: "/images/8.png" },
]

// 1. مكون الهيدر المدمج البديل لـ servicesheader
function HeroSection() {
  return (
    <div dir="rtl" className="bg-[#f0f7f0] py-16 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-4">
          <span className="text-5xl">🌿</span>
        </div>
        <h1 className="text-5xl font-bold text-[#1a5c1a] mb-4">خدماتنا</h1>
        <p className="text-gray-600 text-lg">
          نقدم مجموعة متكاملة من الخدمات الذكية
          <br />
          لجعل إعادة التدوير أسهل وأكثر فائدة للجميع
        </p>
      </div>
    </div>
  )
}

// 2. مكون الكارد المدمج البديل لـ servicecard
function ServiceCard({ service }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow bg-white" style={{ direction: 'rtl' }}>
      <div className="bg-[#f0f7f0] h-52 flex items-center justify-center relative">
        <span className="absolute top-3 left-3 bg-[#2d8a2d] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
          {service.id}
        </span>
        <img src={service.image} alt={service.title} className="h-44 w-full object-contain" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#1a3a1a] mb-3 text-center">{service.title}</h3>
        <ul className="space-y-2 mb-5">
          {service.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-[#2d8a2d]">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full bg-[#2d8a2d] text-white py-2 rounded-lg hover:bg-[#1a5c1a] transition-colors">
          ابدأ الآن ›
        </button>
      </div>
    </div>
  )
}

// 3. الصفحة الرئيسية التي تجمع كل شيء وتصدرها
export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <div dir="rtl" className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" style={{ direction: 'ltr' }}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6" style={{ direction: 'ltr' }}>
            {newServices.map((service) => (
              <div key={service.id} className="w-full md:w-1/3">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

