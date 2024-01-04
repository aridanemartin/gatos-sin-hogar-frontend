import { LatLngExpression } from 'leaflet';

interface LocationsListProps {
  data: any[];
  mapRef: any;
}

export const LocationsList = ({ data, mapRef }: LocationsListProps) => {
  const handleClick = (coords: LatLngExpression) => {
    console.log('mapRef=>>>>>>', mapRef.current);
    mapRef.current.flyTo(coords, 18, { duration: 2 });
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
