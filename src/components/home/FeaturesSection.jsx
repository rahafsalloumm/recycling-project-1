import { motion } from "framer-motion";

export default function FeaturesSection() {

  const features = [
    {
      icon: "♻️",
      title: "جمع النفايات بسهولة",
      desc: "إرسال طلب جمع خلال لحظات من المنزل."
    },
    {
      icon: "🗑️",
      title: "حاويات ذكية",
      desc: "متابعة حالة امتلاء الحاويات بشكل أذكى."
    },
    {
      icon: "🚚",
      title: "استلام من المنزل",
      desc: "نصل إليك في الوقت المناسب لك."
    },
    {
      icon: "🌍",
      title: "نظام مستدام",
      desc: "تقليل التلوث ودعم إعادة التدوير."
    }
  ];

  return (
    <section id='features' className="relative py-24 bg-[#F8FBF6] overflow-hidden">

      {/* خلفية */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300 rounded-full blur-3xl opacity-20" />

      <div className="container mx-auto px-6 relative z-10">

        {/* Title */}
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
          لماذا تختار{" "}
          <span className="text-green-600">EcoCycle</span>؟
        </h2>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="
                bg-white/70
                backdrop-blur-md
                border border-green-100
                rounded-3xl
                p-8
                shadow-sm
                text-center
                cursor-pointer
              "
            >

              <div className="text-5xl mb-4">
                {item.icon}
              </div>

              <h3 className="font-bold text-xl mb-3 text-gray-900">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.desc}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}