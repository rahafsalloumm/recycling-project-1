import { HiGift } from "react-icons/hi2";
import { FiX } from "react-icons/fi";
import { FaLeaf, FaCoins } from "react-icons/fa";

export default function MyRewardsModal({
  type, // "success" | "insufficient"
  rewardName,
  rewardCost,
  currentBalance,
  onClose,
  onViewOtherRewards,
}) {
  if (!type) return null;

  const isSuccess = type === "success";
  const balanceAfter = currentBalance - rewardCost;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
        >
          <FiX size={20} />
        </button>

        <div
          className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
            isSuccess ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {isSuccess ? (
            <HiGift className="text-3xl text-green-600" />
          ) : (
            <FiX className="text-3xl text-red-500" />
          )}
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-2">
          {isSuccess ? "المكافأة قيد الاستبدال" : "النقاط غير كافية"}
        </h2>

        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          {isSuccess ? (
            <>
              تم تأكيد طلب استبدال المكافأة بنجاح.
              <br />
              سيتم استلام المكافأة عند إعادة طلب التدوير التالي.
            </>
          ) : (
            <>
              رصيدك الحالي لا يكفي لاستبدال هذه المكافأة.
              <br />
              يمكنك جمع المزيد من النقاط واستبدالها لاحقًا.
            </>
          )}
        </p>

        <div
          className={`grid grid-cols-3 gap-4 rounded-xl p-4 mb-6 ${
            isSuccess ? "bg-green-50" : "bg-red-50"
          }`}
        >
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">
              {isSuccess ? "رصيدك بعد الاستبدال" : "رصيدك الحالي"}
            </p>
            <FaLeaf
              className={`mx-auto mb-1 ${
                isSuccess ? "text-green-500" : "text-red-400"
              }`}
            />
            <p
              className={`font-bold ${
                isSuccess ? "text-gray-800" : "text-red-500"
              }`}
            >
              {(isSuccess ? balanceAfter : currentBalance).toLocaleString()} نقطة
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">تكلفة المكافأة</p>
            <FaCoins className="text-yellow-500 mx-auto mb-1" />
            <p className="font-bold text-gray-800">
              {rewardCost.toLocaleString()} نقطة
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs mb-1">المكافأة</p>
            <HiGift className="text-green-500 mx-auto mb-1" />
            <p className="font-bold text-gray-800">{rewardName}</p>
          </div>
        </div>

        {isSuccess ? (
          <button
            onClick={onClose}
            className="w-full bg-green-700 text-white rounded-lg py-3 font-semibold hover:bg-green-800"
          >
            حسنًا
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border border-green-600 text-green-700 rounded-lg py-3 font-semibold hover:bg-green-50"
            >
              إغلاق
            </button>
            <button
              onClick={onViewOtherRewards}
              className="flex-1 bg-green-700 text-white rounded-lg py-3 font-semibold hover:bg-green-800"
            >
              عرض المكافآت الأخرى
            </button>
          </div>
        )}
      </div>
    </div>
  );
}