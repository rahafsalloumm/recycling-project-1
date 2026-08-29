import { FaBell, FaUser, FaBars, FaRecycle } from 'react-icons/fa'

function Header() {
  return (
    <div 
      dir="rtl"
      className="fixed top-0 right-0 left-0 z-30 h-16 bg-white border-b border-gray-200 flex items-center shadow-sm"
    >
      <div className="flex items-center w-64 px-4 border-l border-gray-200 h-full gap-2 shrink-0">
        <FaRecycle className="text-[#2d8a2d] text-3xl" />
        <span className="font-bold text-[#1a3a1a] text-2xl">EcoCycle</span>
      </div>

      <button className="text-gray-500 hover:text-gray-700 px-4">
        <FaBars className="text-xl" />
      </button>

      <div className="flex items-center gap-4 mr-auto px-6">
        <div className="relative">
          <FaBell className="text-gray-500 text-xl cursor-pointer hover:text-[#2d8a2d]" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">2</span>
        </div>
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-300">
          <FaUser className="text-gray-500" />
        </div>
      </div>
    </div>
  )
}

export default Header