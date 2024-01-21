import { LatLngExpression } from 'leaflet';

interface LocationsListProps {
  data: any[];
  mapRef: any;
  handleMapPosition: (coords: LatLngExpression) => void;
}

export const LocationsList = ({
  data,
  mapRef,
  handleMapPosition
}: LocationsListProps) => {
  const handleClick = (coords: LatLngExpression) => {
    mapRef.current.flyTo(coords, 18, { duration: 2 });
    handleMapPosition(coords);
  };

  return (
    <ul>
      {data.map((location) => {
        return (
          <li
            onClick={() => handleClick([location.x_coord, location.y_coord])}
            key={location.id}
          >
            {location.name}
          </li>
        );
      })}
    </ul>
  );
};
