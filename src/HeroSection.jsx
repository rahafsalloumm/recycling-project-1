import { useState } from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaTimes } from "react-icons/fa";

export default function HeroSection() {
  // State للتحكم بظهور المنبثقة التوجيهية الذكية
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  return (
    <section id="hero" className="relative bg-[#F8FBF6] overflow-hidden">

      {/* خلفية */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300 rounded-full blur-3xl opacity-30" />

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 min-h-[750px]">

        {/* IMAGE - LEFT */}
        <div className="relative h-[750px] w-full">

          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200 rounded-r-[160px]" />

          <img
            src="/hero-recycling.png"
            alt="Smart Waste Management System"
            className="absolute inset-0 w-full h-full object-cover"
          />

        </div>

        {/* TEXT - RIGHT */}
        <div className="flex flex-col justify-center px-16 text-right">

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-green-200 shadow-sm text-green-700 mb-8 w-fit ml-auto">
            <span>♻️</span>
            <span className="font-medium">
              منصة ذكية لإدارة النفايات وإعادة التدوير
            </span>
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
            منصة ذكية لإدارة
            <span className="block text-green-600 mt-3">
              النفايات وإعادة التدوير
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600 max-w-xl ml-auto">
            نجمع النفايات من المنازل، ونراقب الحاويات الذكية لحظياً، ونحسن مسارات
            الشاحنات لرفع كفاءة الجمع وتقليل التلوث ودعم الاستدامة البيئية.
          </p>
          <div className="flex justify-end gap-4 mt-10">

            {/* زر اطلب الجمع الذي يفتح المنبثقة التوجيهية */}
            <button 
              onClick={() => setShowChoiceModal(true)}
              className="relative overflow-hidden bg-green-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl group"
            >
              اطلب الجمع الآن

              {/* حركة اللمعة */}
              <span className="absolute inset-0 bg-white opacity-10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></span>

              {/* glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>
            </button>

            {/* زر كيف نعمل الأصلي الخاص بكِ بدون أي تغيير */}
            <button className="relative overflow-hidden text-green-600 bg-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl group">
              
              <Link to="/how-it-works" className="text-green-600 relative z-10 w-full h-full block">
                كيف نعمل؟
              </Link>

              {/* حركة اللمعة */}
              <span className="absolute inset-0 bg-white opacity-10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></span>

              {/* glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>

            </button>

          </div>

        </div>

      </div>

      {/* ======================================================== */}
      {/* ===== النافذة المنبثقة التوجيهية المحدثة بخطوط واضحة وكبيرة ===== */}
      {/* ======================================================== */}
      {showChoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl text-center relative border border-green-50 animate-fade-in">
            
            {/* زر الإغلاق الجانبي */}
            <button 
              onClick={() => setShowChoiceModal(false)}
              className="absolute top-5 left-5 text-gray-400 hover:text-gray-600 transition p-1"
            >
              <FaTimes size={16} />
            </button>

            {/* أيقونة المنصة الهادئة */}
            <div className="mx-auto w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-sm">
              ♻️
            </div>

            {/* تم تكبير العنوان هنا إلى text-lg و font-black */}
            <h3 className="text-lg font-black text-gray-800">مرحباً بك في EcoCycle</h3>
            
            {/* تم تكبير نص الوصف إلى text-sm بدلاً من القراءة الصعبة */}
            <p className="text-gray-500 text-sm mt-3 px-2 leading-relaxed font-medium">
              لإرسال شاحنة الجمع للمنازل أو إدارة حسابات الشركات والسائقين بشكل صحيح، يرجى إخبارنا:
            </p>

            {/* خيارات التوجيه بأزرار كبيرة ونصوص واضحة جداً وسهلة النقر */}
            <div className="mt-8 space-y-4">
              
              {/* خيار: لدي حساب بالفعل */}
              <Link
                to="/login"
                className="w-full border-2 border-green-200 text-green-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition duration-300 hover:bg-green-50 shadow-sm"
              >
                <FaSignInAlt size={14} /> لدي حساب بالفعل (تسجيل الدخول)
              </Link>

              {/* خيار: أنا مستخدم جديد */}
              <Link
                to="/register"
                className="w-full bg-[#1b5e20] hover:bg-[#123f16] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 text-sm transition duration-300 shadow-md shadow-green-900/10 hover:scale-[1.01]"
              >
                <FaUserPlus size={14} /> أنا مستخدم جديد (إنشاء حساب)
              </Link>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}

