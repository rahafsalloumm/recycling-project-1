import {  useEffect, useState  } from 'react';
import { FaClipboardList, FaCheckCircle, FaSpinner, FaClock, FaTimesCircle, FaPlus, FaSearch } from "react-icons/fa";

import OrderStatCard from "@/features/admin/components/orders/OrderStatCard";
import OrdersTable from "@/features/admin/components/orders/OrdersTable";
import OrdersInsights from "@/features/admin/components/orders/OrdersInsights";
import adminService from "@/services/admin";

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [ordersData, setOrdersData] = useState([]);
  const [filters, setFilters] = useState({ status: "", wasteType: "", location: "" });
  const [wasteTypes, setWasteTypes] = useState([
    { key: "plastic", label: "بلاستيك" },
    { key: "paper", label: "ورق" },
    { key: "glass", label: "زجاج" },
    { key: "metal", label: "معدن" },
  ]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [orderForm, setOrderForm] = useState({ wasteType: "plastic", quantity: "", address: "", lat: "36.2021", lng: "37.1344", date: "", time: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadOrders = async (nextFilters = filters) => {
    try {
      setLoading(true);
      setError("");
      const response = await adminService.getOrders({
        limit: 100,
        search: searchTerm || undefined,
        status: nextFilters.status || undefined,
        wasteType: nextFilters.wasteType || undefined,
        location: nextFilters.location || undefined,
      });
      const payload = response?.data ?? response ?? {};
      const orders = Array.isArray(payload?.wasteRequests)
        ? payload.wasteRequests
        : Array.isArray(payload?.data)
          ? payload.data
          : [];

      setOrdersData(orders.map((order) => ({
        id: order._id,
        reqCode: `#REQ-${order._id.slice(-4).toUpperCase()}`,
        name: order.user?.name || "مستخدم مجهول",
        email: order.user?.email || "-",
        type: { plastic: "بلاستيك", paper: "ورق", glass: "زجاج", metal: "معدن" }[order.wasteType] || order.wasteType,
        qty: `${order.quantity} كغ`,
        address: order.address,
        date: order.createdAt ? new Date(order.createdAt).toLocaleString("ar-SY") : "-",
        status: { pending: "قيد المراجعة", accepted: "قيد التنفيذ", completed: "تم الاستلام", rejected: "مرفوض" }[order.status] || order.status,
        apiStatus: order.status,
      })));
    } catch (requestError) {
      setError(requestError.message || "تعذر تحميل الطلبات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadOrders({ ...filters, search: searchTerm }); }, [searchTerm, filters.status, filters.wasteType, filters.location]);

  useEffect(() => {
    adminService.getSystemSettings()
      .then((response) => {
        const settings = response?.settings || response?.data?.settings || {};
        if (Array.isArray(settings.wasteTypes) && settings.wasteTypes.length) setWasteTypes(settings.wasteTypes);
      })
      .catch(() => {});
  }, []);

  const handleApplyFilter = (nextFilters) => {
    setFilters(nextFilters);
    loadOrders(nextFilters);
  };

  const handleCreateOrder = async (event) => {
    event.preventDefault();
    setIsCreating(true);
    setError("");
    try {
      await adminService.createOrder({
        wasteType: orderForm.wasteType,
        quantity: Number(orderForm.quantity),
        address: orderForm.address,
        lat: Number(orderForm.lat),
        lng: Number(orderForm.lng),
        pickupSchedule: { date: orderForm.date, time: orderForm.time },
      });
      setOrderForm({ wasteType: "plastic", quantity: "", address: "", lat: "36.2021", lng: "37.1344", date: "", time: "" });
      setIsCreateOpen(false);
      await loadOrders();
    } catch (requestError) {
      setError(requestError.message || "تعذر إنشاء الطلب");
    } finally {
      setIsCreating(false);
    }
  };

  const filteredOrders = ordersData;

  return (
    <div className="w-full space-y-6 text-right font-sans p-1 animate-fadeIn duration-300" dir="rtl">
      {loading && !ordersData.length && (
        <div className="rounded-xl bg-white p-4 text-sm text-gray-600 shadow-sm border border-gray-100">
          جاري تحميل الطلبات...
        </div>
      )}

      {error && <p className="rounded-xl bg-red-50 p-4 text-sm font-bold text-red-600">{error}</p>}
      
      {/* هيدر الصفحة الفخم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <span className="w-1.5 h-6 bg-emerald-600 rounded-full block"></span>
            إدارة الطلبات
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">عرض جميع طلبات جمع النفايات وإدارتها وتحديث حالات الاستلام</p>
        </div>
        <button type="button" onClick={() => setIsCreateOpen(true)} className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl text-sm font-bold shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition-all duration-300 cursor-pointer active:scale-98">
          <FaPlus className="text-xs" /> 
          <span>طلب جديد</span>
        </button>
      </div>

      {/* الكروت العلوية الخمسة كما تظهر بالصورة المرفقة */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <OrderStatCard title="إجمالي الطلبات" value={ordersData.length} desc="من قاعدة البيانات" icon={<FaClipboardList />} bgIcon="text-emerald-600 bg-emerald-50" />
        <OrderStatCard title="تم الاستلام" value={ordersData.filter((order) => order.apiStatus === "completed").length} desc="طلبات مكتملة" icon={<FaCheckCircle />} bgIcon="text-green-600 bg-green-50" />
        <OrderStatCard title="قيد التنفيذ" value={ordersData.filter((order) => order.apiStatus === "accepted").length} desc="طلبات مقبولة" icon={<FaSpinner />} bgIcon="text-blue-600 bg-blue-50" />
        <OrderStatCard title="قيد المراجعة" value={ordersData.filter((order) => order.apiStatus === "pending").length} desc="بانتظار المعالجة" icon={<FaClock />} bgIcon="text-amber-500 bg-amber-50" />
        <OrderStatCard title="مرفوضة" value={ordersData.filter((order) => order.apiStatus === "rejected").length} desc="طلبات مرفوضة" icon={<FaTimesCircle />} bgIcon="text-red-600 bg-red-50" />
      </div>

      {/* شريط البحث النظيف */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <div className="relative w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="ابحث برقم الطلب أو اسم المستخدم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-11 py-3.5 bg-gray-50/50 border border-gray-200/60 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 shadow-inner transition-all duration-300 text-right font-medium text-gray-800"
          />
        </div>
      </div>

      {/* قسم جدول الطلبات والإحصائيات الجانبية متجاورة */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        <div className="xl:col-span-3">
          <OrdersTable orders={filteredOrders} onUpdateStatus={async (id, status) => { await adminService.updateOrder(id, { status }); loadOrders(); }} onDelete={async (id) => { await adminService.deleteOrder(id); loadOrders(); }} />
        </div>
        <div className="xl:col-span-1">
          <OrdersInsights orders={ordersData} onApplyFilter={handleApplyFilter} />
        </div>
      </div>

      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4">
          <form onSubmit={handleCreateOrder} className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 text-right shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-gray-900">إنشاء طلب جمع جديد</h2>
              <button type="button" onClick={() => setIsCreateOpen(false)} className="text-gray-400 hover:text-gray-700" aria-label="إغلاق">×</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="space-y-1 text-sm font-bold text-gray-600"><span>نوع النفايات</span><select required value={orderForm.wasteType} onChange={(event) => setOrderForm({ ...orderForm, wasteType: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5">{wasteTypes.map((type) => <option key={type.key} value={type.key}>{type.label}</option>)}</select></label>
              <label className="space-y-1 text-sm font-bold text-gray-600"><span>الكمية بالكيلو</span><input required min="1" type="number" value={orderForm.quantity} onChange={(event) => setOrderForm({ ...orderForm, quantity: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5" /></label>
              <label className="col-span-2 space-y-1 text-sm font-bold text-gray-600"><span>العنوان</span><input required value={orderForm.address} onChange={(event) => setOrderForm({ ...orderForm, address: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5" /></label>
              <label className="space-y-1 text-sm font-bold text-gray-600"><span>التاريخ</span><input required type="date" value={orderForm.date} onChange={(event) => setOrderForm({ ...orderForm, date: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5" /></label>
              <label className="space-y-1 text-sm font-bold text-gray-600"><span>الوقت</span><input required placeholder="08:30 AM" pattern="(0[0-9]|1[0-2]):[0-5][0-9] (AM|PM)" value={orderForm.time} onChange={(event) => setOrderForm({ ...orderForm, time: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-2.5" /></label>
            </div>
            <button type="submit" disabled={isCreating} className="w-full rounded-xl bg-emerald-600 py-3 font-bold text-white disabled:opacity-60">{isCreating ? "جاري الإنشاء..." : "إنشاء الطلب"}</button>
          </form>
        </div>
      )}

    </div>
  );
}
