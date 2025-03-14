import { useEffect, useState } from 'react';
import type { CatLocation } from '@interfaces/CatForm';
import type { LatLngExpression, LatLngLiteral } from 'leaflet';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

const LAS_PALMAS_CENTER_COORDS: LatLngExpression = {
  lat: 28.129522197859583,
  lng: -15.435619354248049
};

export const UseDefaultCatLocation = (
  catId: number,
  dbLocations: CatLocation[],
  catLocationId: number | null
) => {
  const [defaultLocation, setDefaultLocation] = useState<LatLngLiteral>({
    lat: LAS_PALMAS_CENTER_COORDS.lat,
    lng: LAS_PALMAS_CENTER_COORDS.lng
  });

  useEffect(() => {
    const fetchCatLocation = async () => {
      try {
        const location: CatLocation = await fetch(
          `${baseUrl}/locations/${catLocationId}`
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
      if (catLocationId) {
        fetchCatLocation();
      } else if (dbLocations[0]?.x_coord && dbLocations[0]?.y_coord) {
        defaultCatLocation = {
          lat: dbLocations[0]?.x_coord,
          lng: dbLocations[0]?.y_coord
        };
        setDefaultLocation(defaultCatLocation);
      }
      return defaultCatLocation;
    };

    getDefaultLocation();
  }, [dbLocations, catId, catLocationId]);

  return defaultLocation;
};
