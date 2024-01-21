import { useRef, useMemo, forwardRef, Ref, useEffect } from 'react';
import { LatLngExpression, Marker as MarkerType, map } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  mapPosition: LatLngExpression;
  handleMapPosition: (coords: LatLngExpression) => void;
}

export const Map = forwardRef(function Map(
  { mapPosition, handleMapPosition }: MapProps,
  ref: Ref<any>
) {
  const markerRef = useRef<MarkerType>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) handleMapPosition(marker.getLatLng());
      }
    }),
    [markerRef, handleMapPosition]
  );

  return (
    <MapContainer
      center={mapPosition}
      zoom={15}
      preferCanvas
      style={{ height: '400px', width: '100%' }}
      ref={ref}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        ref={markerRef}
        position={mapPosition}
        draggable
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
});
