import { HiGift } from "react-icons/hi2";
import { FaLeaf, FaCoins } from "react-icons/fa";

export default function MyRewardsCard({
  rewardName = "نبتة داخلية",
  rewardCost = 1200,
  currentBalance = 2450,
  onCancel,
  onRedeem,
}) {
  const balanceAfter = currentBalance - rewardCost;

  return (
    <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-full">
          <HiGift className="text-3xl text-green-600" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">{rewardName}</h2>
          <p className="text-green-700 font-bold">
            {rewardCost.toLocaleString()} نقطة
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4 mb-6">
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-1">رصيدك بعد الاستبدال</p>
          <FaLeaf className="text-green-500 mx-auto mb-1" />
          <p className="font-bold text-gray-800">
            {balanceAfter.toLocaleString()} نقطة
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-1">تكلفة المكافأة</p>
          <FaCoins className="text-yellow-500 mx-auto mb-1" />
          <p className="font-bold text-gray-800">
            {rewardCost.toLocaleString()} نقطة
          </p>
        </div>
        <div className="text-center">
          <p className="text-gray-500 text-sm mb-1">رصيدك الحالي</p>
          <FaLeaf className="text-green-500 mx-auto mb-1" />
          <p className="font-bold text-gray-800">
            {currentBalance.toLocaleString()} نقطة
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onCancel}
          className="flex-1 border border-green-600 text-green-700 rounded-lg py-2 font-semibold hover:bg-green-50"
        >
          إلغاء
        </button>
        <button
          onClick={onRedeem}
          className="flex-1 bg-green-700 text-white rounded-lg py-2 font-semibold hover:bg-green-800"
        >
          استبدل الآن
        </button>
      </div>
    </div>
  );
}