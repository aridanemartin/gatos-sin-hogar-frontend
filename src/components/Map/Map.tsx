import { useRef, useMemo, useState, forwardRef, Ref } from 'react';
import { LatLngExpression, Marker as MarkerType } from 'leaflet';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  position: LatLngExpression;
}

export const Map = forwardRef(function Map(
  { position }: MapProps,
  ref: Ref<any>
) {
  const [currentPosition, setCurrentPosition] = useState(position);
  const markerRef = useRef<MarkerType>(null);

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) setCurrentPosition(marker.getLatLng());
      }
    }),
    []
  );

  // const disneyLandLatLng = [33.8121, -117.9190];
  // function handleOnFlyTo() {
  //   const { current = {} } = markerRef;
  //   const { leafletElement: map } = current;

  //   map.flyTo(disneyLandLatLng, 14, {
  //     duration: 2
  //   });
  // }

  console.log('===currentPosition==>', currentPosition);
  return (
    <MapContainer
      center={currentPosition}
      zoom={20}
      preferCanvas
      style={{ height: '400px', width: '100%' }}
      ref={ref}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        ref={markerRef}
        position={currentPosition}
        draggable
        eventHandlers={eventHandlers}
      />
    </MapContainer>
  );
});
