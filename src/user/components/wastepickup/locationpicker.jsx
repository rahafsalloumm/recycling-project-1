import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useState } from 'react'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng])
    }
  })
  return position ? <Marker position={position} /> : null
}

export default function LocationPicker({ onChange }) {
  const [position, setPosition] = useState([31.9539, 35.9106])
  const [address, setAddress] = useState('عمان، شارع الجامعة الأردنية')

  const handlePositionChange = (pos) => {
    setPosition(pos)
    onChange({ lat: pos[0], lng: pos[1], address })
  }

  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a' }}>📍 الموقع</span>
      </div>
      <input
        value={address}
        onChange={(e) => {
          setAddress(e.target.value)
          onChange({ lat: position[0], lng: position[1], address: e.target.value })
        }}
        placeholder="أدخل العنوان"
        style={{
          width: '100%',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '8px 12px',
          fontSize: '14px',
          marginBottom: '12px',
          direction: 'rtl',
          boxSizing: 'border-box'
        }}
      />
      <div style={{ borderRadius: '12px', overflow: 'hidden', height: '200px' }}>
        <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker position={position} setPosition={handlePositionChange} />
        </MapContainer>
      </div>
      <p style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>اضغط على الخريطة لتحديد موقعك</p>
    </div>
  )
}