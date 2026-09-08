import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // التحكم في ظهور النافذة المنبثقة محلياً للزر

  const handleStartClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      // 👈 إذا كان مسجل دخول ومعه توكن، يتوجه مباشرة لداش بورد الطلبات والتتبع
      navigate("/dashboard");
    } else {
      // 👈 إذا كان زائراً جديداً، نفتح له النافذة المنبثقة فوراً لنسأله
      setShowModal(true);
    }
  };

  return (
    <section id='cta' className="relative py-24 bg-[#F8FBF6] overflow-hidden">
      {/* خلفية التصميم والمؤثرات الأصلية */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="relative rounded-[40px] p-16 text-center text-white overflow-hidden">
          {/* gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/90 to-green-700/90" />

          {/* glow */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl" />

          {/* content */}
          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-extrabold">
              ابدأ استخدام النظام الذكي لإدارة النفايات
            </h2>

            <p className="mt-5 text-green-100 text-lg max-w-2xl mx-auto">
              انضم إلى مستخدمينا وساهم في تحسين عمليات جمع النفايات من المنازل،
              ومراقبة الحاويات الذكية، ودعم إعادة التدوير بشكل أكثر كفاءة.
            </p>

            {/* 🟢 تفعيل الزر لفتح المودال بمرونة تامة */}
            <button 
              onClick={handleStartClick}
              className="
                mt-8 bg-white text-green-700 px-10 py-4 rounded-2xl font-bold
                shadow-lg hover:shadow-2xl
                hover:scale-105 active:scale-95
                transition-all duration-300
              "
            >
              ابدأ الاستخدام
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 النافذة المنبثقة (Modal) التفاعلية والجمثلة مطابقة تماماً لتصميم "اطلب الآن" */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" dir="rtl">
          <div className="bg-white rounded-[24px] p-8 w-full max-w-md space-y-6 shadow-2xl relative text-center border border-gray-100">
            
            {/* زر الإغلاق (X) */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 font-bold text-lg p-1"
            >
              ✕
            </button>

            {/* أيقونة الشعار أو الاستدامة التجميلية فوق */}
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 text-xl font-bold">
              ♻️
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-black text-gray-900">مرحباً بك في EcoCycle</h3>
              <p className="text-gray-500 text-xs md:text-sm leading-relaxed px-4">
                لإرسال شاحنة الجمع للمنازل أو إدارة حسابات الشركات والسائقين بشكل صحيح، يرجى تفعيل الدخول أولاً.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {/* خيار 1: لـدي حساب بالفعل */}
              <button 
                onClick={() => navigate("/login")}
                className="w-full bg-white text-gray-700 font-bold border border-gray-200 p-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition shadow-sm"
              >
                🔑 لدي حساب بالفعل (تسجيل الدخول)
              </button>

              {/* خيار 2: إنشاء حساب جديد */}
              <button 
                onClick={() => navigate("/register")}
                className="w-full bg-green-600 text-white font-extrabold p-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-md shadow-green-100"
              >
                👤 أنا مستخدم جديد (إنشاء حساب)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

