import useGlobalData from '@/hooks/get-global';
import React from 'react';

// إضافة مكتبة leaflet
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// إصلاح مشكلة الأيقونة الافتراضية في leaflet مع React
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

type ServiceUnitDetails = {
  details?: string;
  location?: {
    location_lat?: string;
    location_long?: string;
  };
};

function DService({ id }: { id: any; }) {
  const { data, isLoading, isFetching, isError, refetch } = useGlobalData<{ data?: ServiceUnitDetails }>({
    dataSourceName: `api/service-units/${id}/details`
  });

  const detailsHtml = data?.data?.details;
  const location = data?.data?.location;
  const lat = location?.location_lat ? parseFloat(location.location_lat) : null;
  const lng = location?.location_long ? parseFloat(location.location_long) : null;

  return (
    <div>
      {/* عرض التفاصيل */}
      {detailsHtml && (
        <div
          style={{ marginBottom: 24 }}
          dangerouslySetInnerHTML={{ __html: detailsHtml }}
        />
      )}

      {/* عرض الخريطة إذا توفرت الإحداثيات */}
      {lat && lng && (
        <div style={{ height: 350, width: "100%", borderRadius: 12, overflow: "hidden" }}>
          <MapContainer center={[lat, lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[lat, lng]}>
              <Popup>
                Latitude: {lat} <br /> Longitude: {lng}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default DService;