import { Link } from "react-router-dom";

export default function HeroSection() {
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

            <button className="relative overflow-hidden bg-green-600 text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-green-700 hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl group">
              <Link to="/pickup-request" className="text-white">
                اطلب الجمع الآن
              </Link>

              {/* حركة اللمعة */}
              <span className="absolute inset-0 bg-white opacity-10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></span>

              {/* glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>
            </button>

            <button className="relative overflow-hidden text-green-600 bg-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-2xl group">

              <span className="relative z-10">كيف نعمل؟</span>

              {/* حركة اللمعة */}
              <span className="absolute inset-0 bg-white opacity-10 translate-x-[-120%] group-hover:translate-x-[120%] transition-transform duration-700"></span>

              {/* glow */}
              <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 bg-white blur-xl transition"></span>

            </button>

          </div>

        </div>

      </div>
    </section>
  );
}