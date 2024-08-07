import { useState, useEffect } from 'react';
import { CatApiFormSchema, CatFormFields } from '@interfaces/CatForm';
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
        const res = await fetch(`${baseUrl}/cats/${catId}`);

        if (!res.ok) {
          setError('Error al cargar los datos del gato.');
          setLoading(false);
          return;
        }
        const data = CatApiFormSchema.parse(await res.json());

        const updatedCatData: CatFormFields = {
          name: data?.name || '',
          gender: data?.gender || 'UNKNOWN',
          birthDate: data?.birth_date || '',
          description: data?.description || '',
          personality: data?.personality || '',
          hasChip: Boolean(data?.has_chip),
          picture: data?.picture || '',
          breedId: data?.breed_id,
          spayedNeutered: Boolean(data?.spayed_neutered),
          hasLeukemia: data?.has_leukemia === null ? null : Boolean(data?.has_leukemia),
          medicalConditions: data?.medical_conditions || '',
          dietaryNeeds: data?.dietary_needs || '',
          hasPassedAway: Boolean(data?.has_passed_away),
          locationId: data?.location_id,
          clinicId: data?.clinic_id
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
