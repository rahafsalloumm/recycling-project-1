import { useEffect } from 'react';
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiMap, FiFlag, FiTrendingUp, FiClock } from 'react-icons/fi';
import { useState } from 'react';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const MapSection = ({ route }) => {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const waypoints = route?.waypoints || [];
  const nextWaypoint = waypoints.find((waypoint) => waypoint.waypointStatus === 'pending');
  const mappedWaypoints = waypoints
    .map((waypoint) => {
      const coordinates = waypoint.details?.coordinates;
      const latitude = Number(coordinates?.latitude ?? coordinates?.lat);
      const longitude = Number(coordinates?.longitude ?? coordinates?.lng);

      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)
        || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        return null;
      }

      return { waypoint, position: [latitude, longitude] };
    })
    .filter(Boolean);
  const positions = mappedWaypoints.map(({ position }) => position);
  const mapCenter = positions[0] || [36.2021, 37.1343];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[460px] shadow-[0_2px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] transition-shadow duration-300" dir="rtl">
      {/* الرأس */}
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2.5 text-emerald-800">
          <FiMap className="text-xl stroke-[2.5]" />
          <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">المسار الحالي</h3>
        </div>
        <button
          type="button"
          onClick={() => setIsMapExpanded(true)}
          className="text-xs font-bold text-gray-400 hover:text-emerald-600 bg-gray-50 hover:bg-emerald-50 px-3 py-1.5 rounded-xl transition-all duration-300 active:scale-95"
        >
          عرض الخريطة كاملة
        </button>
      </div>

      {/* مساحة الخريطة الفسيحة والبيضاء تماماً */}
      <div className="relative flex-1 min-h-[270px] bg-slate-50/60 border border-gray-100/70 rounded-2xl overflow-hidden flex items-center justify-center group/map">
        {!isMapExpanded && (
          <RouteMap
            positions={positions}
            mappedWaypoints={mappedWaypoints}
            mapCenter={mapCenter}
          />
        )}
      </div>

      {/* المؤشرات السفلية الفسيحة والمنظمة بوضوح */}
      <div className="grid grid-cols-4 gap-4 text-center mt-5 border-t border-gray-100 pt-5">
        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">وقت الانتهاء المتوقع</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiFlag className="text-sm text-red-500 stroke-[2.5]" />
            <p className="text-xs font-black">—</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">عدد التوقفات المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiTrendingUp className="text-sm text-emerald-500 stroke-[2.5]" />
            <p className="text-xs font-black">{route?.remainingTasks ?? '—'}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">وقت الوصول المتوقع</p>
          <div className="flex items-center gap-1.5 mt-1.5 text-slate-800">
            <FiClock className="text-sm text-blue-500 stroke-[2.5]" />
            <p className="text-xs font-black">—</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1 hover:bg-gray-50 rounded-xl transition-colors duration-200">
          <p className="text-[10px] text-gray-400 font-bold">المحطة التالية</p>
          <p className="text-xs font-black text-emerald-700 mt-1.5 truncate max-w-[110px]">{nextWaypoint?.details?.address || '—'}</p>
          <p className="text-[9px] text-gray-400 font-medium mt-0.5">{nextWaypoint ? `${nextWaypoint.distanceFromPreviousKm} كم` : '—'}</p>
        </div>
      </div>

      {isMapExpanded && (
        <div className="fixed inset-0 z-[100] bg-black/75 p-4 md:p-8 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="الخريطة كاملة">
          <div className="relative z-[101] bg-white rounded-2xl w-full h-full max-w-7xl max-h-[calc(100vh-2rem)] p-4 md:p-6 flex flex-col shadow-2xl" dir="rtl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-extrabold text-gray-800 text-sm tracking-tight">الخريطة كاملة</h3>
              <button
                type="button"
                onClick={() => setIsMapExpanded(false)}
                className="text-sm font-bold text-gray-500 hover:text-red-600 bg-gray-50 hover:bg-red-50 px-4 py-2 rounded-xl transition-colors"
              >
                إغلاق
              </button>
            </div>
            <div className="relative flex-1 min-h-0 rounded-2xl overflow-hidden border border-gray-100">
              <RouteMap
                positions={positions}
                mappedWaypoints={mappedWaypoints}
                mapCenter={mapCenter}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const RouteMap = ({ positions, mappedWaypoints, mapCenter }) => (
  <MapContainer center={mapCenter} zoom={13} scrollWheelZoom={false} className="w-full h-full">
    <TileLayer
      attribution="&copy; OpenStreetMap contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MapViewport positions={positions} />
    {mappedWaypoints.map(({ waypoint, position }) => (
      <Marker key={waypoint.waypointId} position={position}>
        <Popup>
          <div className="text-right font-sans">
            <p className="font-bold text-gray-900">{waypoint.details?.address || '—'}</p>
            <p className="text-xs text-gray-500">{waypoint.details?.wasteOrBinType || waypoint.taskType || '—'}</p>
            <p className="text-xs text-gray-500">{waypoint.waypointStatus || '—'}</p>
          </div>
        </Popup>
      </Marker>
    ))}
    {positions.length > 1 && <Polyline positions={positions} color="#10b981" weight={4} />}
  </MapContainer>
);

const MapViewport = ({ positions }) => {
  const map = useMap();

  useEffect(() => {
    if (positions.length > 1) {
      map.fitBounds(positions, { padding: [24, 24] });
    } else if (positions.length === 1) {
      map.setView(positions[0], 13);
    }
  }, [map, positions]);

  return null;
};

export default MapSection;
