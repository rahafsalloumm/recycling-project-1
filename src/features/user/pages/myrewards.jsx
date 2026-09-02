import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MyRewardsHeader from "../components/myrewards/myrewardsheader";
import MyRewardsCard from "../components/myrewards/myrewardscard";
import MyRewardsStatusTracker from "../components/myrewards/myrewardsstatustracker";
import MyRewardsTable from "../components/myrewards/myrewardstable";
import MyRewardsModal from "../components/myrewards/myrewardsmodal";

const redeemedRewards = [
  { name: "نبتة داخلية", points: 1200, status: "قيد الانتظار" },
  { name: "شنطة قماش", points: 900, status: "تم التسليم" },
  { name: "طقم زراعة", points: 1300, status: "تم الطلب" },
];

export default function MyRewards() {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null); // null | "success" | "insufficient"

  const rewardName = "نبتة داخلية";
  const rewardCost = 1200;
  const currentBalance = 2450; // بدلها لاحقاً برصيد المستخدم الحقيقي من الـ API

  const handleCancel = () => {
    navigate(-1);
  };

  const handleRedeem = () => {
    if (currentBalance >= rewardCost) {
      setModalType("success");
    } else {
      setModalType("insufficient");
    }
  };

  const closeModal = () => setModalType(null);

  return (
    <div className="w-full p-6" dir="rtl">
      <MyRewardsHeader />
      <MyRewardsCard
        rewardName={rewardName}
        rewardCost={rewardCost}
        currentBalance={currentBalance}
        onCancel={handleCancel}
        onRedeem={handleRedeem}
      />
      <MyRewardsStatusTracker currentStep="pending" />
      <MyRewardsTable rewards={redeemedRewards} />

      <MyRewardsModal
        type={modalType}
        rewardName={rewardName}
        rewardCost={rewardCost}
        currentBalance={currentBalance}
        onClose={closeModal}
        onViewOtherRewards={() => navigate("/rewardsnew")}
      />
    </div>
  );
}