import ServicesHeader from '../home/components/services/servicesheader/servicesheader'
import ServiceCard from '../home/components/services/servicecard/servicecard'

const services = [
  { id: 1, title: "استلام النفايات من المنزل", items: ["احجز موعد الاستلام بسهولة", "اختر نوع وكمية النفايات", "تواصل مع فريقنا في أي وقت"], image: "/images/1.png" },
  { id: 2, title: "نظام المكافآت والنقاط", items: ["اجمع نقاطاً مقابل كل عملية تدوير", "استبدل النقاط بمكافآت وقسائم", "عروض ومكافآت حصرية"], image: "/images/2.png" },
  { id: 3, title: "تتبع الطلبات", items: ["تابع حالة طلبك لحظة بلحظة", "إشعارات فورية بالتحديثات", "شفافية كاملة لكل الطلبات"], image: "/images/3.png" },
  { id: 4, title: "إعادة تدوير للشركات", items: ["حلول مخصصة للشركات", "استلام دوري للنفايات", "تقارير وإحصائيات مفصلة"], image: "/images/4.png" },
  { id: 5, title: "التوعية البيئية", items: ["نصائح يومية للحفاظ على البيئة", "معلومات عن أهمية إعادة التدوير", "مقالات وفيديوهات توعوية"], image: "/images/5.png" },
  { id: 6, title: "دعم العملاء", items: ["تواصل معنا في أي وقت", "رد سريع على استفساراتك", "مساعدة عبر جميع القنوات"], image: "/images/6.png" },
]

const newServices = [
  { id: 7, title: "الحاويات الذكية", items: ["مراقبة لمستوى الامتلاء", "بيانات لحظية عبر IoT", "تنبيهات عند امتلاء الحاويات"], image: "/images/7.png" },
  { id: 8, title: "تحسين مسارات الجمع", items: ["مسارات ذكية تقلل الوقت والتكلفة", "تحديث تلقائي حسب حالة الحاويات", "كفاءة أعلى وخدمة أسرع"], image: "/images/8.png" },
]

function ServicesPage() {
  return (
    <div>
      <ServicesHeader />
      <div dir="rtl" className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6" style={{direction: 'ltr'}}>
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="flex justify-center gap-6" style={{direction: 'ltr'}}>
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

export default ServicesPage