import { useEffect } from 'react';
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FiFlag, FiClock, FiList, FiNavigation } from 'react-icons/fi';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const getMappedWaypoints = (waypoints) => waypoints
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

const RouteMap = ({ mappedWaypoints, positions, mapCenter }) => (
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

const LiveMapSection = ({ route }) => {
  const waypoints = route?.waypoints || [];
  const mappedWaypoints = getMappedWaypoints(waypoints);
  const positions = mappedWaypoints.map(({ position }) => position);
  const mapCenter = positions[0] || [36.2021, 37.1343];
  const finalDestination = waypoints.find((waypoint) => waypoint.taskType === 'FinalDestination');
  const timeHours = Math.floor((route?.estimatedTimeMinutes || 0) / 60);
  const timeMinutes = (route?.estimatedTimeMinutes || 0) % 60;
  const remainingTime = route ? `${timeHours} ساعة ${timeMinutes} دقيقة` : '—';

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col justify-between min-h-[640px] shadow-[0_2px_12px_rgba(0,0,0,0.01)]" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <p className="text-[11px] text-gray-400 font-bold tracking-wide">عرض ومتابعة مسارك الحالي ومواقع التوقف</p>
      </div>

      <div className="relative flex-1 min-h-[420px] bg-slate-50 border border-gray-100/80 rounded-2xl overflow-hidden">
        {positions.length > 0 ? (
          <RouteMap mappedWaypoints={mappedWaypoints} positions={positions} mapCenter={mapCenter} />
        ) : (
          <div className="h-full flex items-center justify-center text-sm text-gray-400">
            لا توجد إحداثيات صالحة لمحطات هذا المسار حالياً.
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 text-center mt-5 border-t border-gray-100 pt-5 bg-gray-50/40 p-2 rounded-xl">
        <div className="flex flex-col items-center justify-center p-1">
          <p className="text-[10px] text-gray-400 font-bold">الوجهة الأخيرة</p>
          <div className="flex items-center gap-1 mt-1 text-slate-800">
            <FiFlag className="text-xs text-red-500 stroke-[2.5]" />
            <p className="text-xs font-black truncate max-w-[95px]">{finalDestination?.details?.address || '—'}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1">
          <p className="text-[10px] text-gray-400 font-bold">المهام المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiList className="text-xs text-amber-500 stroke-[2.5]" />
            <p className="text-xs font-black">{route?.remainingTasks ?? '—'} مهام</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1">
          <p className="text-[10px] text-gray-400 font-bold">الوقت المتبقي</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiClock className="text-xs text-blue-500 stroke-[2.5]" />
            <p className="text-xs font-black">{remainingTime}</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-1">
          <p className="text-[10px] text-gray-400 font-bold">المسافة المتبقية</p>
          <div className="flex items-center gap-1.5 mt-1 text-slate-800">
            <FiNavigation className="text-xs text-emerald-500 stroke-[2.5]" />
            <p className="text-xs font-black">{route?.remainingDistanceKm ?? '—'} كم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMapSection;
