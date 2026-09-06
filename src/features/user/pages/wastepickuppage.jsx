import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaUserCircle, FaLeaf, FaTruck } from 'react-icons/fa'
import Sidebar from '../components/sidebar/sidebar/sidebar'
import WasteTypeSelector from '../components/wastepickup/wastetypeselector'
import LocationPicker from '../components/wastepickup/locationpicker'
import DateTimePicker from '../components/wastepickup/datetimepicker'
import WeightInput from '../components/wastepickup/weightinput'
import ImageUpload from '../components/wastepickup/imageupload'
import NotesInput from '../components/wastepickup/notesinput'
import { userService } from '@/services'

const formatPickupTime = (timeString) => {
  if (!timeString) return ''

  const [hourString, minute] = timeString.split(':')
  const hour = Number(hourString)
  const suffix = hour >= 12 ? 'PM' : 'AM'
  const normalizedHour = hour % 12 || 12

  return `${normalizedHour}:${minute} ${suffix}`
}

export default function WastePickupPage() {
  const [activePage, setActivePage] = useState('wastepickup')
  const [selectedWaste, setSelectedWaste] = useState(null)
  const [location, setLocation] = useState({ lat: null, lng: null, address: '' })
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [weight, setWeight] = useState('')
  const [image, setImage] = useState(null)
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async () => {
    if (!selectedWaste) {
      setError('يرجى اختيار نوع النفايات')
      return
    }

    if (!location.address.trim() || location.lat === null || location.lng === null) {
      setError('يرجى إضافة العنوان وتحديد موقع التسليم على الخريطة')
      return
    }

    if (!date || !time) {
      setError('يرجى اختيار تاريخ ووقت التسليم')
      return
    }

    if (!weight || Number(weight) < 1) {
      setError('يرجى إضافة الوزن التقريبي للنفايات')
      return
    }

    if (!image) {
      setError('يرجى إرفاق صورة للنفايات')
      return
    }

    const formData = new FormData()
    formData.append('wasteType', selectedWaste)
    formData.append('address', location.address || 'غير محدد')
    formData.append('lat', String(location.lat))
    formData.append('lng', String(location.lng))
    formData.append('quantity', String(Number(weight) || 0))
    formData.append('pickupSchedule[date]', date)
    formData.append('pickupSchedule[time]', formatPickupTime(time))
    formData.append('notes', notes || '')
    formData.append('image', image)

    setLoading(true)
    setError('')
    setSuccess('')

    try {
      const result = await userService.createWasteRequest(formData)
      setSuccess(result?.message || 'تم إرسال الطلب بنجاح!')
      setSelectedWaste(null)
      setLocation({ lat: null, lng: null, address: '' })
      setWeight('')
      setNotes('')
      setImage(null)
      setDate('')
      setTime('')
    } catch (err) {
      const backendMessage = Array.isArray(err?.errors)
        ? err.errors.join(' • ')
        : err?.message || 'حدث خطأ أثناء إرسال الطلب'
      setError(backendMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>

          {/* يسار - الأيقونات */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/profile" aria-label="الملف الشخصي">
              <FaUserCircle style={{ fontSize: '28px', color: '#555', cursor: 'pointer' }} />
            </Link>
          </div>

          {/* يمين - الشعار */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>

        </div>

        {/* المحتوى */}
        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>

          <h1 style={{ fontSize: '28px', fontWeight: '900', color: '#1a1a1a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            طلب تسليم النفايات
            <FaTruck style={{ color: '#2d6a2d' }} />
          </h1>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>املأ البيانات التالية لإرسال طلب تسليم النفايات</p>

          <WasteTypeSelector selected={selectedWaste} onSelect={setSelectedWaste} />

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: '700', fontSize: '16px', marginBottom: '16px', color: '#1a1a1a' }}>تفاصيل الطلب</h3>
            <LocationPicker onChange={setLocation} />
            <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />
            <DateTimePicker date={date} time={time} onDateChange={setDate} onTimeChange={setTime} />
 <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <WeightInput value={weight} onChange={setWeight} />
              </div>
              <div style={{ flex: 1 }}>
                <ImageUpload onChange={setImage} />
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
            <NotesInput value={notes} onChange={setNotes} />
          </div>

          <div style={{ backgroundColor: '#f0f7ee', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            <span style={{ fontSize: '14px', color: '#2d6a2d', fontWeight: '600' }}>سيتم احتساب النقاط بعد استلام الطلب وتقييم كمية النفايات</span>
          </div>

          {error && (
            <div style={{ marginTop: '16px', backgroundColor: '#fff1f2', color: '#b42318', border: '1px solid #fecdd3', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', fontWeight: '600' }}>
              {error}
            </div>
          )}

          {success && (
            <div style={{ marginTop: '16px', backgroundColor: '#ecfdf5', color: '#067647', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '12px 14px', fontSize: '14px', fontWeight: '600' }}>
              {success}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: loading ? '#7ca07b' : '#2d6a2d',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '16px',
              marginBottom: '16px'
            }}
          >
            {loading ? 'جارٍ إرسال الطلب...' : 'إرسال الطلب ✈️'}
          </button>

          <div style={{ backgroundColor: '#f0f7ee', borderRadius: '12px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            <span style={{ fontSize: '13px', color: '#2d6a2d' }}>بمساهمتك، نساعد في الحفاظ على البيئة نظيفة ومستدامة</span>
          </div>

        </div>
      </div>
    </div>
  )
}