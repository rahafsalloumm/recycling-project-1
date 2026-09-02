import { useNavigate } from "react-router-dom";
import { 
  FaLeaf, FaCalendarCheck, FaRecycle, FaTruck, FaShoppingBag, 
  FaTint, FaSeedling, FaBoxOpen, FaCoffee, FaTrashRestore, FaSolarPanel 
} from "react-icons/fa";
import Navbar from "../../components/layout/Navbar"; 
import heroImg from "../../assets/images/rewards-hero.png"; 

export default function RewardsPage() {
  const navigate = useNavigate();
  const points = 2450;

  const earnMethods = [
    { icon: <FaLeaf size={32} className="text-green-850" />, title: "شارك الوعي البيئي", points: "+15 نقطة" },
    { icon: <FaCalendarCheck size={32} className="text-green-850" />, title: "استخدم المنصة بانتظام", points: "+10 نقطة" },
    { icon: <FaRecycle size={32} className="text-green-850" />, title: "قم بإعادة تدوير", points: "+20 نقطة" },
    { icon: <FaTruck size={32} className="text-green-850" />, title: "اطلب استلام النفايات", points: "+50 نقطة" },
  ];

  const rewards = [
    { icon: <FaShoppingBag size={38} className="text-pink-600" />, title: "شنطة قماش", subtitle: "صديقة للبيئة وخفيفة للتوصيل", cost: "900 نقطة" },
    { icon: <FaTint size={38} className="text-blue-500" />, title: "زجاجة مياه مخصصة", subtitle: "مقاومة للصدأ وقابلة لإعادة الاستخدام", cost: "800 نقطة" },
    { icon: <FaSeedling size={38} className="text-emerald-600" />, title: "نبتة داخلية صغيرة", subtitle: "في أصيص بلاستيكي آمن للنقل", cost: "1,200 نقطة" },
    { icon: <FaLeaf size={38} className="text-emerald-500" />, title: "طقم بذور زراعية", subtitle: "مجموعة بذور سريعة النمو في الميدان", cost: "1,100 نقطة" },
    { icon: <FaBoxOpen size={38} className="text-amber-600" />, title: "صندوق سماد عضوي", subtitle: "عبوة مغلفة مخصصة للحدائق المنزلية", cost: "1,400 نقطة" },
    { icon: <FaCoffee size={38} className="text-yellow-700" />, title: "كوب حراري حافظ", subtitle: "مصنوع من مواد معاد تدويرها", cost: "1,000 نقطة" },
    /* 📌 الجائزة الجديدة الأولى */
    { icon: <FaTrashRestore size={38} className="text-teal-600" />, title: "أكياس فرز منزلية", subtitle: "طقم أكياس ملونة وقابلة لإعادة الاستخدام", cost: "600 نقطة" },
    /* 📌 الجائزة الجديدة الثانية */
    { icon: <FaSolarPanel size={38} className="text-cyan-500" />, title: "شاحن طاقة شمسي", subtitle: "شاحن محمول للأجهزة الذكية عبر الشمس", cost: "3,500 نقطة" }
  ];
  return (
    /* تلوين الخلفية العامة بالأخضر المريمي الناعم جداً لراحة العين وحمايتها */
    <div dir="rtl" className="min-h-screen bg-[#EBF1EB] font-sans antialiased text-gray-700 pb-20">
      
      <Navbar />

      {/* 📐 تم تحرير قسم الهيرو هنا ليأخذ العرض الكامل للشاشة بشكل مستقل وحر */}
      <div className="w-full bg-white border-b border-green-200/40 relative min-h-[260px] flex items-center shadow-xs">
        <img
          src={heroImg}
          alt="EcoCycle Full Width Header"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />
        {/* طبقة تظليل خفيفة وناعمة لحماية العين من سحب البياض الساطع */}
        <div className="absolute inset-0 bg-green-900/[0.01] pointer-events-none"></div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 flex flex-col md:flex-row justify-between items-center py-8">
          
          {/* دائرة النقاط المتاحة */}
          <div className="bg-[#1b3a2b] text-white rounded-full w-28 h-28 flex flex-col items-center justify-center font-bold shadow-md shadow-emerald-950/25 border-4 border-white flex-shrink-0 text-center transform transition hover:scale-105">
            <span className="text-xl font-black font-mono tracking-tight">{points.toLocaleString()}</span>
            <span className="text-[11px] font-bold text-emerald-300 mt-0.5">نقطة متاحة</span>
          </div>

          {/* نصوص الترحيب المركزية فوق بياض الصورة الممتدة */}
          <div className="text-center flex-1 space-y-2.5 mt-4 md:mt-0 z-10">
            <h1 className="text-3xl md:text-4xl font-black text-[#1b3a2b] flex items-center justify-center gap-2">
              <FaLeaf className="text-green-700 text-2xl md:text-3xl" /> كافئ نفسك
            </h1>
            <p className="text-gray-800 text-sm md:text-base font-extrabold leading-relaxed max-w-xl mx-auto">
              اجمع النقاط مع كل خطوة تخطوها نحو بيئة أنظف
              <br />
              استبدل نقاطك بمكافآت صديقة للبيئة وحضرية
            </p>
          </div>
 {/* موازن هندسي متناسق */}
          <div className="hidden md:block w-28 h-28 flex-shrink-0 relative">
            {/* الدائرة المعلقة المتموضعة بدقة متناهية فوق الحافة السفلية للهيدر العريض */}
            <div className="absolute bottom-[-56px] left-0 bg-white rounded-full w-24 h-24 flex items-center justify-center text-center text-[11px] font-black text-green-800 shadow-md border border-green-200/50 z-20 leading-tight">
              كل نقطة<br />تحدث فرقاً
            </div>
          </div>
        </div>
      </div>

      {/* باقي محتويات الصفحة بداخل حاوية العرض المحددة المتناسقة */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        
        {/* ===== كيف تكسب النقاط ===== */}
        <div className="text-right">
          <h2 className="text-lg md:text-xl font-black text-[#1b3a2b] flex items-center justify-center gap-2 mb-6">
            <FaLeaf className="text-green-600 text-sm" /> كيف تكسب النقاط؟
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {earnMethods.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-green-200/40 rounded-2xl p-6 text-center shadow-xs flex flex-col items-center justify-center transition-all duration-300 hover:shadow-md hover:border-green-300"
              >
                <div className="mb-3 transform transition duration-300 hover:scale-110">
                  {item.icon}
                </div>
                <p className="font-bold text-[#1b3a2b] text-xs md:text-sm">{item.title}</p>
                <p className="text-green-800 font-black text-xs font-mono mt-2 bg-green-50 border border-green-100/80 px-3 py-0.5 rounded-full shadow-xs">{item.points}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== استبدل نقاطك بمكافآت رائعة للتوصيل الميداني ===== */}
        <div className="mt-14 text-right">
          <h2 className="text-lg md:text-xl font-black text-[#1b3a2b] flex items-center justify-center gap-2 mb-8">
            <FaLeaf className="text-green-600 text-sm" /> استبدل نقاطك بمكافآت رائعة
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className="bg-white border border-green-200/50 rounded-3xl p-5 shadow-xs flex flex-col justify-between transition-all duration-300 hover:scale-[1.02] hover:shadow-md hover:border-green-400 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-green-50/40 w-16 h-16 rounded-2xl flex items-center justify-center border border-green-100/30 mb-4 transition-colors group-hover:bg-green-100/30">
                    {reward.icon}
                  </div>
                  <h3 className="font-black text-gray-800 text-sm md:text-base">{reward.title}</h3>
                  <p className="text-gray-400 text-xs font-medium mt-1 mb-2.5 leading-tight">{reward.subtitle}</p>
                  <p className="text-green-800 font-black text-xs font-mono mb-4 bg-green-50 border border-green-100/60 px-3 py-0.5 rounded-xl inline-block shadow-inner">{reward.cost}</p>
                </div>
                
                <button
                  type="button"
                  onClick={() => navigate("/myrewards")}
                  className="w-full bg-green-700 hover:bg-green-800 text-white border-none rounded-xl py-3 text-xs font-black shadow-xs transition duration-300 cursor-pointer active:scale-98"
                >
                  استبدل الآن
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

