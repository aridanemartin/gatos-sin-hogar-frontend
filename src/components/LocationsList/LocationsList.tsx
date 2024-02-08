import { LatLngExpression, Map as LeafletMapType } from 'leaflet';
import './LocationList.scss';
import { RefObject } from 'react';

export interface Location {
  id: number;
  name: string;
  x_coord: number;
  y_coord: number;
}
interface LocationsListProps {
  data: Location[];
  mapRef: RefObject<LeafletMapType>;
  currentMapPosition: LatLngExpression;
  handleMapPosition: (coords: LatLngExpression) => void;
}

export const LocationsList = ({
  data,
  mapRef,
  currentMapPosition,
  handleMapPosition
}: LocationsListProps) => {
  const handleClick = (coords: LatLngExpression) => {
    if (JSON.stringify(coords) === JSON.stringify(currentMapPosition)) return;
    mapRef?.current?.flyTo(coords, 18, { duration: 2 });
    handleMapPosition(coords);
  };

  return (
    <>
      <h2>Localizaciones:</h2>
      <ul className="locationList">
        {data.map((location) => {
          return (
            <li
              className="locationList__item"
              onClick={() => handleClick([location.x_coord, location.y_coord])}
              key={location.id}
            >
              {location.name}
            </li>
          );
        })}
      </ul>
    </>
  );
};
