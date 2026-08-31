 import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { FaChevronDown, FaChevronUp, FaClock, FaMapMarkerAlt, FaTrash, FaWeightHanging } from 'react-icons/fa'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const statusStyles = {
  'مكتمل': { bg: '#e8f5e9', color: '#2d6a2d' },
  'قيد التنفيذ': { bg: '#e3f2fd', color: '#1565c0' },
  'قيد المراجعة': { bg: '#fff8e1', color: '#b8860b' },
}

const timelineSteps = [
  { key: 'review', label: 'قيد المراجعة' },
  { key: 'accepted', label: 'تم القبول' },
  { key: 'onway', label: 'في الطريق' },
  { key: 'received', label: 'تم الاستلام' },
]

export default function OrderCard({
  orderNumber,
  status,
  date,
  expanded,
  onToggle,
  location,
  lat,
  lng,
  wasteType,
  weight,
  timelineStep = 0,
}) {
  const statusStyle = statusStyles[status] || { bg: '#eee', color: '#555' }
  const inset = 100 / (timelineSteps.length * 2)
  const progress = Math.max(timelineStep - 1, 0) / (timelineSteps.length - 1) * (100 - inset * 2)

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '16px',
      padding: '16px 20px',
      marginBottom: '12px',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      direction: 'rtl'
    }}>

      {/* الهيدر */}
      <div
        onClick={onToggle}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.color,
            fontSize: '12px',
            fontWeight: '700',
            padding: '4px 12px',
            borderRadius: '20px',
            whiteSpace: 'nowrap'
          }}>
            {status}
          </span>
          <div>
            <p style={{ fontSize: '15px', fontWeight: '700', color: '#1a1a1a', margin: 0, marginBottom: '4px' }}>طلب #{orderNumber}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>{date}</span>
              <FaClock style={{ fontSize: '11px', color: '#aaa' }} />
            </div>
          </div>
        </div>

        {expanded ? (
          <FaChevronUp style={{ color: '#aaa', fontSize: '14px', flexShrink: 0 }} />
        ) : (
          <FaChevronDown style={{ color: '#aaa', fontSize: '14px', flexShrink: 0 }} />
        )}
      </div>

      {/* المحتوى الموسّع */}
      {expanded && (
        <>
          <div style={{ height: '1px', backgroundColor: '#f0f0f0', margin: '16px 0' }} />

          <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>الموقع</span>
                  <FaMapMarkerAlt style={{ fontSize: '12px', color: '#2d6a2d' }} />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>{location}</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>نوع النفايات</span>
 <FaTrash style={{ fontSize: '12px', color: '#2d6a2d' }} />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>{wasteType}</p>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>الوزن التقريبي</span>
                  <FaWeightHanging style={{ fontSize: '12px', color: '#2d6a2d' }} />
                </div>
                <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a1a', margin: 0 }}>{weight}</p>
              </div>
            </div>

            <div style={{ flex: 1, minWidth: '200px', borderRadius: '12px', overflow: 'hidden', minHeight: '140px' }}>
              <MapContainer
                center={[lat, lng]}
                zoom={14}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%', minHeight: '140px' }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[lat, lng]} />
              </MapContainer>
            </div>
          </div>

          {/* الخط الزمني */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <div style={{
              position: 'absolute',
              top: '11px',
              right: `${inset}%`,
              left: `${inset}%`,
              height: '2px',
              backgroundColor: '#e0e0e0'
            }} />
            <div style={{
              position: 'absolute',
              top: '11px',
              right: `${inset}%`,
              width: `${progress}%`,
              height: '2px',
              backgroundColor: '#2d6a2d'
            }} />

            <div style={{ display: 'flex', position: 'relative' }}>
              {timelineSteps.map((step, index) => {
                const stepNumber = index + 1
                const isActive = stepNumber <= timelineStep
                return (
                  <div key={step.key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isActive ? '#2d6a2d' : '#e0e0e0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isActive && <span style={{ color: 'white', fontSize: '11px' }}>✓</span>}
                    </div>
                    <p style={{ fontSize: '11px', color: '#555', margin: '6px 0 0', textAlign: 'center' }}>{step.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <button style={{
            width: '100%',
            backgroundColor: '#2d6a2d',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            padding: '12px',
            fontSize: '14px',
            fontWeight: '700',
            cursor: 'pointer'
          }}>
            عرض التفاصيل
          </button>
        </>
      )}
    </div>
  )
}