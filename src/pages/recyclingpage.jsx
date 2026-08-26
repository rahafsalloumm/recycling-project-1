import { useState } from 'react'
import { FaBell, FaUserCircle, FaLeaf } from 'react-icons/fa'
import Sidebar from '../user/components/cycle/sidebar/sidebar'
import RecyclingStats from '../user/components/recycling/recyclingstats/recyclingstats'
import RecyclingFilter from '../user/components/recycling/recyclingfilter/recyclingfilter'
import RecyclingTable from '../user/components/recycling/recyclingtable/recyclingtable'

export default function RecyclingPage() {
  const [activePage, setActivePage] = useState('recycling')
  const [filterType, setFilterType] = useState('الكل')

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', direction: 'rtl' }}>

      <Sidebar activePage={activePage} onNavigate={(page) => setActivePage(page)} />

      <div style={{ marginRight: '260px' }}>

        {/* الهيدر */}
        <div style={{ backgroundColor: 'white', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative' }}>
              <FaBell style={{ fontSize: '20px', color: '#555' }} />
              <span style={{ position: 'absolute', top: '-6px', right: '-6px', backgroundColor: '#e53e3e', color: 'white', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
            </div>
            <FaUserCircle style={{ fontSize: '28px', color: '#555' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaLeaf style={{ color: '#2d6a2d', fontSize: '20px' }} />
            <span style={{ fontWeight: '900', fontSize: '18px', color: '#2d6a2d' }}>EcoCycle</span>
          </div>
        </div>

        {/* المحتوى */}
        <div style={{ width: '100%', padding: '32px 24px', boxSizing: 'border-box' }}>
          <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#1a1a1a', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <FaLeaf style={{ color: '#2d6a2d' }} />
            سجل إعادة التدوير
          </h1>
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '24px', textAlign: 'center' }}>عرض جميع عمليات إعادة التدوير التي قمت بها</p>

          <RecyclingStats />
          <RecyclingFilter onFilterChange={setFilterType} />
          <RecyclingTable filterType={filterType} />

        </div>
      </div>
    </div>
  )
}