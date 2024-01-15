import { useEffect, useState } from 'react';
import { CatLocation } from '@interfaces/FormData';
import { LatLngExpression } from 'leaflet';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const UseDefaultCatLocation = (
  catId: number,
  locationId: number,
  dbLocations: CatLocation[]
) => {
  const [defaultLocation, setDefaultLocation] = useState<LatLngExpression>({
    lat: 1,
    lng: 1
  });

  useEffect(() => {
    const fetchCatLocation = async () => {
      try {
        const location: CatLocation = await fetch(
          `${baseUrl}/locations/${catId}`
        ).then((res) => res.json());
        const defaultCatLocation = {
          lat: location.x_coord,
          lng: location.y_coord
        };
        setDefaultLocation(defaultCatLocation);
      } catch (error) {
        console.log('error!');
      }
    };

    const getDefaultLocation = () => {
      let defaultCatLocation;
      if (locationId) {
        fetchCatLocation();
      } else {
        defaultCatLocation = {
          lat: dbLocations[0]?.x_coord ?? 1,
          lng: dbLocations[0]?.y_coord ?? 1
        };
        setDefaultLocation(defaultCatLocation);
      }
      return defaultCatLocation;
    };

    getDefaultLocation();
  }, [dbLocations]);

  return defaultLocation;
};
