import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf, FaTruck } from 'react-icons/fa'
import Sidebar from '../user/components/cycle/sidebar/sidebar'
import WasteTypeSelector from '../user/components/wastepickup/wastetypeselector'
import LocationPicker from '../user/components/wastepickup/locationpicker'
import DateTimePicker from '../user/components/wastepickup/datetimepicker'
import WeightInput from '../user/components/wastepickup/weightinput'
import ImageUpload from '../user/components/wastepickup/imageupload'
import NotesInput from '../user/components/wastepickup/notesinput'

export default function WastePickupPage() {
  const [activePage, setActivePage] = useState('wastepickup')
  const [selectedWaste, setSelectedWaste] = useState(null)
  const [location, setLocation] = useState({ lat: 36.2021, lng: 37.1343, address: 'سوريا , حلب , الاسماعلية' })
  const [date, setDate] = useState('2024-05-20')
  const [time, setTime] = useState('10:00')
  const [weight, setWeight] = useState(5)
  const [image, setImage] = useState(null)
  const [notes, setNotes] = useState('')

  const handleSubmit = () => {
    if (!selectedWaste) {
      alert('الرجاء اختيار نوع النفايات')
      return
    }
    console.log({ selectedWaste, location, date, time, weight, image, notes })
    alert('تم إرسال الطلب بنجاح!')
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>

          {/* يسار - الأيقونات */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <FaBell style={{ fontSize: '20px', color: '#555' }} />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#e53e3e', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <FaUserCircle style={{ fontSize: '28px', color: '#555' }} />
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
            طلب استلام النفايات
            <FaTruck style={{ color: '#2d6a2d' }} />
          </h1>
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '24px' }}>املأ البيانات التالية لإرسال طلب استلام النفايات</p>

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
            <span style={{ fontSize: '14px', color: '#2d6a2d', fontWeight: '600' }}>ستحصل تقريباً على 50 نقطة بعد استلام الطلب</span>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              backgroundColor: '#2d6a2d',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px',
              fontSize: '18px',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}
          >
            إرسال الطلب ✈️
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