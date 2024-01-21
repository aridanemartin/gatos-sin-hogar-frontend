import { useRef, useEffect } from 'react';
import { LocationsList } from '@components/LocationsList/LocationsList';
import { Map } from '@components/Map/Map';
import { Modal } from '@components/Modal/Modal';
import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { CatLocation } from '@interfaces/CatForm';
import { UseDefaultCatLocation } from '@hooks/UseDefaultCatLocation';

interface MapModalProps {
  catId: string | undefined;
  catLocationId: string | undefined;
  locations: CatLocation[];
  closeModal: () => void;
}

export const MapModal = ({
  catId,
  catLocationId,
  locations,
  closeModal
}: MapModalProps) => {
  const locationsModalRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef(null);

  const defaultLocation = UseDefaultCatLocation(
    Number(catId),
    Number(catLocationId),
    locations
  );
  const [mapPosition, setMapPosition] = useState(defaultLocation);

  const handleMapPosition = (position: LatLngExpression) => {
    setMapPosition(position);
  };

  useEffect(() => {
    if (mapRef.current) {
      handleMapPosition(defaultLocation);
      mapRef?.current.flyTo(defaultLocation, 18, { duration: 2 });
    }
  }, [defaultLocation]);

  return (
    <Modal
      ref={locationsModalRef}
      width="400px"
      height="400px"
      closeModal={closeModal}
    >
      <>
        <Map
          mapPosition={mapPosition}
          handleMapPosition={handleMapPosition}
          ref={mapRef}
        />
        <LocationsList
          handleMapPosition={handleMapPosition}
          data={locations}
          mapRef={mapRef}
        />
      </>
    </Modal>
  );
};
