export default function CTASection() {
  return (
    <section id='cta' className="relative py-24 bg-[#F8FBF6] overflow-hidden">

      {/* خلفية */}
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

            <button className="
              mt-8 bg-white text-green-700 px-10 py-4 rounded-2xl font-bold
              shadow-lg hover:shadow-2xl
              hover:scale-105 active:scale-95
              transition-all duration-300
            ">
              ابدأ الاستخدام
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}