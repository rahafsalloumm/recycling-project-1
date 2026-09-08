import { useEffect, useState } from "react";
import publicService from "@/services/public";

export default function StatsSection() {
  const [count, setCount] = useState({
    users: 0,
    requests: 0,
    waste: 0,
    bins: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let interval;

    const loadRealStats = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await publicService.getLandingPageStats();
        const data = res?.data?.data;

        if (!data) {
          throw new Error("لم تصل بيانات إحصائيات الصفحة الرئيسية");
        }

        const target = {
          users: data.usersCount,
          requests: data.requestsCount,
          waste: data.recycledTon,
          bins: data.binsCount,
        };

        const duration = 1000;
        const steps = 30;
        let current = 0;

        interval = setInterval(() => {
          if (!isMounted) return;

          current += 1;

          setCount({
            users: Math.min(Math.floor((target.users / steps) * current), target.users),
            requests: Math.min(Math.floor((target.requests / steps) * current), target.requests),
            waste: Math.min(Number(((target.waste / steps) * current).toFixed(1)), target.waste),
            bins: Math.min(Math.floor((target.bins / steps) * current), target.bins),
          });

          if (current >= steps) clearInterval(interval);
        }, duration / steps);
      } catch (err) {
        if (isMounted) setError(err);
        console.error("خطأ في جلب إحصائيات الصفحة الرئيسية:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadRealStats();

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
    };
  }, []);

  return (
    <section
      className="relative bg-[#F8FBF6] -mt-20 py-24 overflow-hidden"
      aria-busy={loading}
      aria-describedby={error ? "stats-error" : undefined}
    >
      {error && (
        <span id="stats-error" className="sr-only">
          تعذر تحميل إحصائيات الصفحة الرئيسية
        </span>
      )}
      {/* الخلفية والمؤثرات البصرية الأصلية للتصميم */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 text-center" dir="rtl">

          {/* عدد المستخدمين الحقيقيين */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.users}+
            </h2>
            <p className="mt-2 text-gray-600">مستخدم نشط</p>
          </div>

          {/* عدد طلبات الجمع الحقيقية */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.requests}+
            </h2>
            <p className="mt-2 text-gray-600">طلب جمع نفايات</p>
          </div>

          {/* كمية الأوزان الحقيقية المجمعة */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.waste} طن
            </h2>
            <p className="mt-2 text-gray-600">نفايات معاد تدويرها</p>
          </div>

          {/* عدد الحاويات الحقيقي */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.bins}+
            </h2>
            <p className="mt-2 text-gray-600">حاوية ذكية مفعّلة</p>
          </div>

        </div>
      </div>
    </section>
  );
}
