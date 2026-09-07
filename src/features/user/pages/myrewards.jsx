import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MyRewardsHeader from '../components/myrewards/myrewardsheader'
import MyRewardsCard from '../components/myrewards/myrewardscard'
import MyRewardsStatusTracker from '../components/myrewards/myrewardsstatustracker'
import MyRewardsTable from '../components/myrewards/myrewardstable'
import MyRewardsModal from '../components/myrewards/myrewardsmodal'
import { rewardsService, userService } from '@/services'

const statusMap = {
  waiting_next_pickup: 'قيد الانتظار',
  delivered: 'تم التسليم',
  cancelled: 'ملغى',
}

export default function MyRewards() {
  const navigate = useNavigate()
  const location = useLocation()
  const selectedReward = location.state?.reward || null

  const [modalType, setModalType] = useState(null)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profile, myClaims] = await Promise.all([
          userService.getProfile(),
          rewardsService.getMyClaims(),
        ])

        setCurrentBalance(profile?.points || 0)
        setClaims(myClaims?.data || myClaims?.claims || [])
      } catch (err) {
        setError(err?.message || 'تعذر تحميل بيانات المكافآت')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const rewardName = selectedReward?.title || 'مكافأة'
  const rewardCost = Number(selectedReward?.points || 0)

  const handleCancel = () => {
    navigate(-1)
  }

  const handleRedeem = async () => {
    if (!selectedReward?.id) {
      setModalType('insufficient')
      return
    }

    if (currentBalance < rewardCost) {
      setModalType('insufficient')
      return
    }

    try {
      await rewardsService.redeemReward(selectedReward.id, { notes: 'طلب استبدال من صفحة المكافآت' })
      setCurrentBalance((prev) => Math.max(prev - rewardCost, 0))
      setModalType('success')
      const refreshedClaims = await rewardsService.getMyClaims()
      setClaims(refreshedClaims?.data || refreshedClaims?.claims || [])
    } catch (err) {
      setError(err?.message || 'تعذر استبدال المكافأة')
      setModalType('insufficient')
    }
  }

  const closeModal = () => setModalType(null)

  const redeemedRewards = claims.map((claim) => ({
    name: claim.rewardId?.title || 'مكافأة',
    points: claim.pointsSpent || 0,
    status: statusMap[claim.status] || 'قيد الانتظار',
  }))

  return (
    <div className="w-full p-6" dir="rtl">
      {loading ? (
        <p style={{ textAlign: 'center', color: '#666' }}>جاري تحميل بيانات المكافآت...</p>
      ) : error ? (
        <p style={{ textAlign: 'center', color: 'crimson' }}>{error}</p>
      ) : (
        <>
          <MyRewardsHeader />
          <MyRewardsCard
            rewardName={rewardName}
            rewardCost={rewardCost}
            currentBalance={currentBalance}
            onCancel={handleCancel}
            onRedeem={handleRedeem}
          />
          <MyRewardsStatusTracker currentStep={selectedReward ? 'pending' : 'pending'} />
          <MyRewardsTable rewards={redeemedRewards} />

          <MyRewardsModal
            type={modalType}
            rewardName={rewardName}
            rewardCost={rewardCost}
            currentBalance={currentBalance}
            onClose={closeModal}
            onViewOtherRewards={() => navigate('/rewardsnew')}
          />
        </>
      )}
    </div>
  )
}