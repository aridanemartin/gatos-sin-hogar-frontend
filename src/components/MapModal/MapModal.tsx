import { useRef, useEffect } from 'react';
import { LocationsList } from '@components/LocationsList/LocationsList';
import { Map } from '@components/Map/Map';
import { Modal } from '@components/Modal/Modal';
import { LatLngExpression } from 'leaflet';
import { useState } from 'react';
import { CatLocation } from '@interfaces/CatForm';
import { UseDefaultCatLocation } from '@hooks/UseDefaultCatLocation';
import './MapModal.scss';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { Map as LeafletMap } from 'leaflet';
interface MapModalProps {
  catId: string | undefined;
  catLocationId: number | null;
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
  const mapRef = useRef<LeafletMap | null>(null);

  const defaultLocation = UseDefaultCatLocation(
    Number(catId),
    locations,
    catLocationId
  );
  const [mapPosition, setMapPosition] = useState(defaultLocation);

  const handleMapPosition = (position: LatLngExpression) => {
    setMapPosition(position);
  };

  useEffect(() => {
    if (mapRef.current) {
      handleMapPosition(defaultLocation);
      mapRef?.current?.flyTo(defaultLocation, 18, { duration: 2 });
    }
  }, [defaultLocation]);

  return (
    <Modal className="mapModal" ref={locationsModalRef} closeModal={closeModal}>
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
        <TextInput
          label="Añadir Nueva Localización"
          name="locationName"
          placeholder="Nombre de la localización"
        />
      </>
    </Modal>
  );
};
