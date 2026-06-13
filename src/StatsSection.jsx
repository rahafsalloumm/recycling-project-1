import { useEffect, useState } from "react";

export default function StatsSection() {
  const [count, setCount] = useState({
    users: 0,
    requests: 0,
    waste: 0,
    bins: 0,
  });

  useEffect(() => {
    const duration = 1200;
    const steps = 40;
    let current = 0;

    const target = {
      users: 5000,
      requests: 1200,
      waste: 3,
      bins: 150,
    };

    const interval = setInterval(() => {
      current += 1;

      setCount({
        users: Math.min(Math.floor((target.users / steps) * current), target.users),
        requests: Math.min(Math.floor((target.requests / steps) * current), target.requests),
        waste: Math.min(Number(((target.waste / steps) * current).toFixed(1)), target.waste),
        bins: Math.min(Math.floor((target.bins / steps) * current), target.bins),
      });

      if (current >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#F8FBF6] -mt-20 py-24 overflow-hidden">

      {/* خلفية */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-green-200 rounded-full blur-3xl opacity-30" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid md:grid-cols-4 gap-8 text-center">

          {/* Users */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.users}+
            </h2>
            <p className="mt-2 text-gray-600">مستخدم</p>
          </div>

          {/* Requests */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.requests}+
            </h2>
            <p className="mt-2 text-gray-600">طلب جمع نفايات</p>
          </div>

          {/* Waste */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.waste} طن
            </h2>
            <p className="mt-2 text-gray-600">نفايات معاد تدويرها</p>
          </div>

          {/* Bins */}
          <div className="bg-white/70 backdrop-blur-md border border-green-100 rounded-2xl py-10 shadow-sm hover:scale-105 transition">
            <h2 className="text-5xl font-extrabold text-green-600">
              {count.bins}+
            </h2>
            <p className="mt-2 text-gray-600">حاوية ذكية</p>
          </div>

        </div>

      </div>
    </section>
  );
}