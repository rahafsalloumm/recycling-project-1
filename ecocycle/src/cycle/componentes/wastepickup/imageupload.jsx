import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'

export default function ImageUpload({ onChange }) {
  const [preview, setPreview] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      alert('حجم الصورة يجب أن يكون أقل من 5MB')
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
      onChange(file)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div style={{ direction: 'rtl', marginBottom: '8px' }}>
      <p style={{ fontSize: '14px', fontWeight: '600', color: '#1a1a1a', marginBottom: '8px' }}>إرفاق صورة (اختياري)</p>
      <label style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px dashed #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        cursor: 'pointer',
        backgroundColor: '#fafafa'
      }}>
        <input type="file" accept=".jpg,.png" onChange={handleFile} style={{ display: 'none' }} />
        {preview ? (
          <img src={preview} alt="preview" style={{ width: '100%', maxHeight: '150px', objectFit: 'contain', borderRadius: '8px' }} />
        ) : (
          <>
            <FaCloudUploadAlt style={{ fontSize: '32px', color: '#aaa', marginBottom: '8px' }} />
            <p style={{ fontSize: '13px', color: '#888' }}>رفع صورة</p>
            <p style={{ fontSize: '11px', color: '#aaa' }}>JPG, PNG حتى 5MB</p>
          </>
        )}
      </label>
    </div>
  )
}