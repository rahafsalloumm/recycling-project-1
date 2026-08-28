function ServiceCard({ service }) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow" style={{direction: 'rtl'}}>
      <div className="bg-[#f0f7f0] h-52 flex items-center justify-center relative">
        <span className="absolute top-3 left-3 bg-[#2d8a2d] text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
          {service.id}
        </span>
        <img src={service.image} alt={service.title} className="h-44 w-full object-contain" />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-[#1a3a1a] mb-3 text-center">{service.title}</h3>
        <ul className="space-y-2 mb-5">
          {service.items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-600 text-sm">
              <span className="text-[#2d8a2d]">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <button className="w-full bg-[#2d8a2d] text-white py-2 rounded-lg hover:bg-[#1a5c1a] transition-colors">
          ابدأ الآن ›
        </button>
      </div>
    </div>
  )
}

export default ServiceCard