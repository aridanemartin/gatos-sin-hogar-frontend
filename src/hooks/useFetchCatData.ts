import { useState, useEffect } from 'react';
import { CatApiFormSchema, type CatFormFields } from '@interfaces/CatForm';
import { ZodError } from 'zod';

export interface FetchCatDataResult {
  loading: boolean;
  catData: CatFormFields | null;
  error: string | null;
}

export const useFetchCatData = (
  catId: string | undefined,
  baseUrl: string
): FetchCatDataResult => {
  const [loading, setLoading] = useState(true);
  const [catData, setCatData] = useState<CatFormFields | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${baseUrl}/cats/${catId}`, {
          credentials: 'include'
        });

        if (!res.ok) {
          setError('Error al cargar los datos del gato.');
          setLoading(false);
          return;
        }

        const {
          name,
          gender,
          birth_date,
          description,
          personality,
          has_chip,
          picture,
          breed_id,
          spayed_neutered,
          has_leukemia,
          medical_conditions,
          dietary_needs,
          has_passed_away,
          location_id,
          clinic_id
        } = CatApiFormSchema.parse(await res.json());

        const updatedCatData: CatFormFields = {
          name: name || '',
          gender: gender || 'UNKNOWN',
          birthDate: birth_date || '',
          description: description || '',
          personality: personality || '',
          hasChip: Boolean(has_chip),
          picture: picture || '',
          breedId: breed_id,
          spayedNeutered: Boolean(spayed_neutered),
          hasLeukemia: has_leukemia === null ? null : Boolean(has_leukemia),
          medicalConditions: medical_conditions || '',
          dietaryNeeds: dietary_needs || '',
          hasPassedAway: Boolean(has_passed_away),
          locationId: location_id,
          clinicId: clinic_id
        };

        setCatData(updatedCatData);
        setLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(error.message);
        } else {
          setError('Error al cargar los datos del gato.');
        }
        setLoading(false);
      }
    };

    if (catId) {
      fetchData();
    }
  }, [catId, baseUrl]);

  return { loading, catData, error };
};
