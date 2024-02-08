import { useContext, useEffect, useState } from 'react';
import { CatFormData } from '@interfaces/CatForm';
import { EventsContext } from '@contexts/EventsContext';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const UseFormSetupData = () => {
  const eventEmitters = useContext(EventsContext);

  const [formData, setFormData] = useState<CatFormData>({
    genders: [
      {
        id: 0,
        name: 'UNKNOWN'
      }
    ],
    breeds: [],
    locations: [],
    clinics: [],
    incidents: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genders, breeds, locations, clinics, incidents] =
          await Promise.all([
            fetch(`${baseUrl}/genders`).then((res) => res.json()),
            fetch(`${baseUrl}/breeds`).then((res) => res.json()),
            fetch(`${baseUrl}/locations`).then((res) => res.json()),
            fetch(`${baseUrl}/clinics`).then((res) => res.json()),
            fetch(`${baseUrl}/incidents`).then((res) => res.json())
          ]);
        setFormData({
          genders,
          breeds,
          locations,
          clinics,
          incidents
        });
      } catch (error) {
        console.log('error!');
      }
    };

    const fetchLocations = async () => {
      const locations = await fetch(`${baseUrl}/locations`);
      const locationsData = await locations.json();
      setFormData((prev) => ({ ...prev, locations: locationsData }));
    };

    fetchData();

    // Subscribe to the event
    if (eventEmitters) {
      eventEmitters.on('updateLocations', fetchLocations);
    }

    // Unsubscribe on component unmount
    return () => {
      if (eventEmitters) {
        eventEmitters.off('updateLocations', fetchData);
      }
    };
  }, [eventEmitters]);

  return formData;
};
