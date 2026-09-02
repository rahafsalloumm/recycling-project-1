import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaBuilding, FaTruck, FaMobileAlt, FaGift, FaRoute, FaCheckCircle, FaArrowLeft } from "react-icons/fa";
import Navbar from "@/components/layout/Navbar";

export default function HowItWorks() {
  const [activeTab, setActiveTab] = useState("user");

  const userSteps = [
    {
      num: "01",
      icon: <FaMobileAlt />,
      title: "اطلب عبر التطبيق",
      desc: "حدد نوع المواد القابلة للتدوير (بلاستيك، ورق، زجاج) وموقعك بدقة على الخريطة بلمسة واحدة.",
    },
    {
      num: "02",
      icon: <FaTruck />,
      title: "استلام من باب بيتك",
      desc: "يتوجه إليك أقرب سائق في الموعد المحدد لجمع الشحنة وتأكيد الأوزان بكل شفافية وسهولة.",
    },
    {
      num: "03",
      icon: <FaGift />,
      title: "اكسب مكافآتك فوراً",
      desc: "تحول أوزان شحنتك مباشرة إلى نقاط بيئية في رصيدك لتستبدلها بمكافآت وخصومات حصرية وجذابة.",
    },
  ];

  const companySteps = [
    {
      num: "01",
      icon: <FaBuilding />,
      title: "تسجيل حساب المنشأة",
      desc: "أنشئ ملف شركتك البيئي لجدولة وإدارة مخلفات الإنتاج أو الأوراق المكتبية بشكل منظم ودوري.",
    },
    {
      num: "02",
      icon: <FaRoute />,
      title: "جمع ونقل مجدول",
      desc: "نوفر أسطولاً مخصصاً لنقل الحاويات الكبيرة من منشأتك مباشرة إلى مراكز التدوير المعتمدة برعاية كاملة.",
    },
    {
      num: "03",
      icon: <FaCheckCircle />,
      title: "شهادات الاستدامة",
      desc: "احصل على تقارير رقمية وشهادات بيئية رسمية تثبت حجم مساهمة شركتك في خفض الانبعاثات الكربونية.",
    },
  ];

  const driverSteps = [
    {
      num: "01",
      icon: <FaTruck />,
      title: "استقبال وإدارة المهام",
      desc: "افتح تطبيق السائق واستقبل طلبات الجمع الذكية المتاحة والقريبة من نطاقك الجغرافي الحالي.",
    },
    {
      num: "02",
      icon: <FaRoute />,
      title: "تتبع المسار المحسن",
      desc: "اتبع الخرائط الذكية التي توفر لك أقصر وأسرع الطرق لتوفير الوقود والوقت وجمع أكبر كمية ممكنة.",
    },
    {
      num: "03",
      icon: <FaGift />,
      title: "عقود وأرباح يومية",
      desc: "كل نقلة أو حاوية تساهم في تفريغها وتوصيلها للمركز ترفع من تقييمك وعوائدك المالية مباشرة.",
    },
  ];

  const currentSteps = activeTab === "user" ? userSteps : activeTab === "company" ? companySteps : driverSteps;

  return (
    <div className="min-h-screen bg-[#F9FBF8] flex flex-col font-sans text-sm text-gray-700 antialiased">
      
      {/* الناف بار الحقيقي الموحد والشفاف والناعم كلياً */}
      <Navbar />

      {/* محتوى الصفحة الرئيسي */}
      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center">
        
        {/* ===== هيدر مبتكر وراقي جداً: بدون أظرف طائرة وبدون تعجيق وبأعلى حيوية ===== */}
        <div className="text-center max-w-xl mb-16 relative">
          {/* غصن ورقي ناعم وثابت بالخلفية ليعطي لمسة جمالية مستدامة */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-green-600/10 text-8xl select-none pointer-events-none">🌿</div>
          
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight relative z-10">
            رحلة التدوير في <span className="text-[#1b5e20]">EcoCycle</span>
          </h1>
          <p className="text-gray-400 mt-3 text-xs md:text-sm font-medium leading-relaxed max-w-md mx-auto">
            نؤمن بالسهولة والأناقة؛ تعرف على خطواتك المخصصة للمساهمة في بناء بيئة خضراء مستدامة ونظيفة.
          </p>
        </div>

        {/* ===== أزرار التبويبات الثلاثية بتصميم انسيابي راقي جداً ===== */}
        <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm mb-16 bg-white p-1.5 rounded-2xl border border-green-100/40 shadow-sm">
          <button
            type="button"
            onClick={() => setActiveTab("user")}
            className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 text-xs transition duration-300 ${
              activeTab === "user" ? "bg-[#1b5e20] text-white shadow-sm shadow-green-900/10" : "text-gray-400 hover:bg-green-50/40 hover:text-green-700"
            }`}
          >
            <FaUser size={10} /> مستخدم
          </button>
          
         
          <button
            type="button"
            onClick={() => setActiveTab("driver")}
            className={`py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 text-xs transition duration-300 ${
              activeTab === "driver" ? "bg-[#1b5e20] text-white shadow-sm shadow-green-900/10" : "text-gray-400 hover:bg-green-50/40 hover:text-green-700"
            }`}
          >
            <FaTruck size={10} /> سائق
          </button>
        </div>
        {/* ===== 🟢 الخط الزمني المبتكر (Timeline) - قمة الرقي والتميز للتعبير عن خطوات العمل ===== */}
        <div className="w-full relative px-2 mb-16">
          
          {/* الخط الأخضر الخفي الممتد خلف البطاقات والذي يربط خطوات الرحلة ببعضها بصرياً */}
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-green-100 via-green-200 to-green-100 z-0 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch relative z-10">
            {currentSteps.map((step, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center text-center space-y-4 shadow-sm transition duration-300 hover:shadow-md hover:scale-[1.01] group relative overflow-hidden"
              >
                {/* خلفية الرقم الكبيرة الشفافة والأنيقة جداً في زاوية الكرت */}
                <div className="absolute -left-2 -top-4 text-6xl font-black text-green-50/40 select-none pointer-events-none font-mono group-hover:text-green-50/80 transition duration-300">
                  {step.num}
                </div>

                {/* حلقة دائرية خضراء ناصعة تحتضن الأيقونة الثابتة الراقية */}
                <div className="w-12 h-12 bg-[#E8F5E9] text-[#1b5e20] rounded-xl flex items-center justify-center text-lg shadow-inner transition duration-300 group-hover:bg-[#1b5e20] group-hover:text-white">
                  {step.icon}
                </div>
                
                <h3 className="text-xs font-bold text-gray-800 transition duration-300 group-hover:text-[#1b5e20]">
                  {step.title}
                </h3>
                
                <p className="text-gray-400 text-[11px] leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== صندوق التوجيه السفلي البسيط والفاخر ===== */}
        <div className="w-full max-w-sm text-center bg-white border border-gray-100/80 rounded-2xl p-6 shadow-sm">
          <h4 className="text-xs font-bold text-gray-800 mb-3">جاهز لبدء رحلتك البيئية معنا؟</h4>
          <Link
            to="/register"
            className="w-full bg-[#1b5e20] hover:bg-[#123f16] text-white py-2.5 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-1.5 text-xs shadow-sm shadow-green-100"
          >
            أنشئ حسابك الآن <FaArrowLeft className="text-[9px]" />
          </Link>
        </div>

      </div>
    </div>
  );
}

