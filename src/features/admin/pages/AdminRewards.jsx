import {  useState  } from 'react';
import { FaPlus, FaSearch, FaStar, FaUsers, FaCoins, FaBoxes, FaGift } from "react-icons/fa";

import RewardStatCard from "@/features/admin/components/rewards/RewardStatCard";
import RewardsTable from "@/features/admin/components/rewards/RewardsTable";

export default function AdminRewards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("الكل");

  // مصفوفة الحوافز المحدثة بناءً على طلبك بدقة
  const [rewardsData, setRewardsData] = useState([
    { id: 1, name: "قسيمة حسم 50% من فاتورة الكهرباء المنزلية الرسمية", category: "خدمات عامة وإعفاءات", points: 1500, stock: "مفتوح", claimed: 1420, icon: "⚡", status: true },
    { id: 2, name: "قسيمة شراء مواد غذائية أساسية من الجمعيات التعاونية الاستهلاكية", category: "قسائم استهلاكية ومدفوعات", points: 1200, stock: 150, claimed: 2450, icon: "🛒", status: true },
    { id: 3, name: "تحويل رصيد مالي مباشر عبر خدمة (شام كاش)", category: "قسائم استهلاكية ومدفوعات", points: 1000, stock: "مفتوح", claimed: 1680, icon: "📱", status: true },
    { id: 4, name: "نبتة منزلية طبيعية أنيقة لتنقية الهواء الداخلي", category: "منتجات بيئية بديلة", points: 400, stock: 120, claimed: 340, icon: "🪴", status: true },
    { id: 5, name: "كوب (ماج) حراري حافظ للحرارة والبرودة", category: "منتجات بيئية بديلة", points: 500, stock: 200, claimed: 510, icon: "☕", status: true },
    { id: 6, name: "حقيبة ظهر متينة ومقاومة للماء مصنوعة من قماش معاد تدويره", category: "منتجات بيئية بديلة", points: 2500, stock: 45, claimed: 115, icon: "🎒", status: true },
    { id: 7, name: "زجاجة مياه حرارية (ستانلس ستيل) تحفظ برودة السوائل", category: "منتجات بيئية بديلة", points: 1200, stock: 80, claimed: 290, icon: "🧪", status: true }
  ]);

  // دالة تشغيل وتغيير حالة الإتاحة (Toggle Switch) الحية
  const handleToggleStatus = (id) => {
    setRewardsData(prevRewards =>
      prevRewards.map(reward =>
        reward.id === id ? { ...reward, status: !reward.status } : reward
      )
    );
  };

  // توليد فئات المكافآت الجانبية المحدثة
  const categories = [
    { name: "الكل", icon: "🌿", count: rewardsData.length },
    { name: "خدمات عامة وإعفاءات", icon: "⚡", count: rewardsData.filter(r => r.category === "خدمات عامة وإعفاءات").length },
    { name: "قسائم استهلاكية ومدفوعات", icon: "🛒", count: rewardsData.filter(r => r.category === "قسائم استهلاكية ومدفوعات").length },
    { name: "منتجات بيئية بديلة", icon: "🎒", count: rewardsData.filter(r => r.category === "منتجات بيئية بديلة").length }
  ];

  // عمليات الفلترة المزدوجة بالبحث والفئات الجانبية
  const filteredRewards = rewardsData.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "الكل" || reward.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      
      {/* هيدر الصفحة */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            نظام الحوافز والمكافآت الخدمية
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">تحفيز المشاركة المجتمعية عبر ربط نقاط التدوير بإعفاءات خدمية وحوافز عصرية مرغوبة</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>إضافة حافز جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الإحصائية */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <RewardStatCard title="إجمالي النقاط الموزعة" value="125,430" desc="+12% هذا الشهر" icon={<FaCoins />} bgIcon="text-emerald-600 bg-emerald-50" />
        <RewardStatCard title="الحوافز المستردة" value="6,830" desc="عملية استبدال مكتملة" icon={<FaGift />} bgIcon="text-blue-600 bg-blue-50" />
        <RewardStatCard title="المستفيدين من الدعم" value="1,245" desc="مستند لنقاط التدوير" icon={<FaUsers />} bgIcon="text-purple-600 bg-purple-50" />
        <RewardStatCard title="معدل النقاط الاستهلاكي" value="1,250" desc="نقطة / مستخدم" icon={<FaStar />} bgIcon="text-amber-500 bg-amber-50" />
      </div>

      {/* شريط البحث المطور */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث عن حافز متاح..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800 placeholder-gray-400"
          />
        </div>
      </div>

      {/* الجدول والقائمة الجانبية الفعالة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <RewardsTable rewards={filteredRewards} onToggleStatus={handleToggleStatus} />
        </div>
        
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
            <h4 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-1.5 border-b border-gray-50 pb-2">
              <FaBoxes className="text-emerald-600 text-xs" />
              <span>فئات الحوافز المتاحة</span>
            </h4>
            <div className="space-y-2 text-xs font-bold text-gray-600">
              {categories.map((cat) => (
                <div 
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex justify-between items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    activeCategory === cat.name 
                      ? "bg-emerald-600 text-white shadow-md font-black translate-x-[-2px]" 
                      : "bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800 border border-gray-100/50"
                  }`}
                >
                  <span>{cat.icon} {cat.name}</span>
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-md ${activeCategory === cat.name ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"}`}>{cat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
