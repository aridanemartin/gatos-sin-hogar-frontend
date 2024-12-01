import { useRef, useState, useEffect, ChangeEvent, useContext } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';
import { Link, useParams } from 'react-router-dom';
import { UseFormSetupData } from '@hooks/UseFormSetupData';
import { CatFormFields, CatFormSchema, GenderType } from '@interfaces/CatForm';
import { CatEditFormContext } from '@contexts/CatFormContext';
import './CatEditPage.scss';
import { ZodError, typeToFlattenedError } from 'zod';

import UseToast from '@hooks/UseToast';
import { environment } from '@consts/environments';
import { FetchCatDataResult, useFetchCatData } from '@hooks/useFetchCatData';
import { GeneralInformationSection } from './sections/GeneralInformationSection/GeneralInformationSection';
import { AboutCatSection } from './sections/AboutCatSection/AboutCatSection';
import { TitleVariant } from '@components/Title/Title.types';
import { Title } from '@components/Title/Title';
import { LocationSection } from './sections/LocationSection/LocationSection';

export const CatEditPage = ({ isEditPage }: { isEditPage?: boolean }) => {
  const { baseUrl } = environment;
  const { catId } = useParams();
  const { toastSuccess, toastError } = UseToast();

  const [errors, setErrors] = useState(
    {} as typeToFlattenedError<CatFormFields>
  );

  const { selectedFormValues, setSelectedFormValues } =
    useContext(CatEditFormContext);
  const {
    loading: fetchCatDataLoading,
    catData,
    error: fetchCatDataError
  }: FetchCatDataResult = useFetchCatData(catId, baseUrl);

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const personalityRef = useRef<HTMLTextAreaElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const hasChipRef = useRef<HTMLSelectElement>(null);
  const breedIdRef = useRef<HTMLSelectElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const spayedNeuteredRef = useRef<HTMLSelectElement>(null);
  const hasLeukemiaRef = useRef<HTMLSelectElement>(null);
  const medicalConditionsRef = useRef<HTMLTextAreaElement>(null);
  const dietaryNeedsRef = useRef<HTMLTextAreaElement>(null);
  const hasPassedAwayRef = useRef<HTMLSelectElement>(null);
  const clinicIdRef = useRef<HTMLInputElement>(null);
  const catImageRef = useRef<HTMLInputElement>(null);

  const handleResetImage = () => {
    if (catImageRef?.current) {
      catImageRef.current.value = '';
    }
  };

  useEffect(() => {
    if (catData && isEditPage) {
      setSelectedFormValues(catData);
    }
  }, [catData, setSelectedFormValues, isEditPage]);

  const formData = UseFormSetupData();

  const handleCatFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields: CatFormFields = {
      name: nameRef?.current?.value || '',
      description: descriptionRef?.current?.value || '',
      personality: personalityRef?.current?.value || '',
      gender: (genderRef?.current?.value as GenderType) || 'UNKNOWN',
      hasChip: Boolean(hasChipRef?.current?.value === 'true'),
      picture: catImageRef?.current?.value || '',
      breedId: Number(breedIdRef?.current?.value) || 0,
      birthDate: birthDateRef?.current?.value || '',
      spayedNeutered: Boolean(spayedNeuteredRef?.current?.value === 'true'),
      hasLeukemia:
        hasLeukemiaRef?.current?.value === 'null'
          ? null
          : Boolean(hasLeukemiaRef?.current?.value === 'true'),
      dietaryNeeds: dietaryNeedsRef?.current?.value || '',
      hasPassedAway: Boolean(hasPassedAwayRef.current?.value === 'true'),
      medicalConditions: medicalConditionsRef?.current?.value || '',
      locationId: Number(selectedFormValues.locationId),
      clinicId: Number(clinicIdRef?.current?.value)
    };

    try {
      const validatedData = CatFormSchema.parse(formFields);

      await fetch(`${baseUrl}/cats/${catId ?? ''}`, {
        method: catId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validatedData)
      });

      if (catImageRef?.current?.files && catImageRef.current.files[0]) {
        const formData = new FormData();
        formData.append('picture', catImageRef?.current?.files[0]);

        await fetch(`${baseUrl}/cats/upload-image/${catId}`, {
          method: 'POST',
          body: formData
        });
      }

      toastSuccess('Gato guardado con éxito');
    } catch (error) {
      if (error instanceof ZodError) {
        const errorObj = error.flatten();
        setErrors(errorObj);
      } else {
        console.log(error);
        toastError('Error al guardar/actualizar el gato.');
      }
    }
  };

  if (fetchCatDataError) {
    toastError(fetchCatDataError, {
      toastId: 'fetchCatDataError'
    });
    return <p>Algo ha sucedido</p>;
  }

  if (fetchCatDataLoading && isEditPage) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Link to="/dashboard" className="catPage__backLink">
        Volver
      </Link>
      <Title variant={TitleVariant.H1}>Editar Gato</Title>
      <form onSubmit={handleCatFormSubmit} className="catPage__form">
        <section className="catPage__header"></section>

        <GeneralInformationSection
          nameRef={nameRef}
          genderRef={genderRef}
          hasChipRef={hasChipRef}
          breedIdRef={breedIdRef}
          birthDateRef={birthDateRef}
          spayedNeuteredRef={spayedNeuteredRef}
          hasLeukemiaRef={hasLeukemiaRef}
          catImageRef={catImageRef}
          hasPassedAwayRef={hasPassedAwayRef}
          selectedFormValues={selectedFormValues}
          handleResetImage={handleResetImage}
          formData={formData}
          errors={errors}
        />
        <AboutCatSection
          descriptionRef={descriptionRef}
          personalityRef={personalityRef}
          selectedFormValues={selectedFormValues}
          errors={errors}
        />

        <section className="catPage__healthRecordsSection">
          <h2>Historial Médico:</h2>
          <TextAreaInput
            name="dietary_needs"
            label="Dieta Específica"
            placeholder="Dieta Específica"
            ref={dietaryNeedsRef}
            defaultValue={selectedFormValues.dietaryNeeds}
          />
          <TextAreaInput
            name="medical_conditions"
            label="Condiciones Médicas"
            placeholder="Condiciones Médicas"
            ref={medicalConditionsRef}
            defaultValue={selectedFormValues.medicalConditions}
          />
          {/* TODO: This inputs are set temporary. Remember to change it for the real
          locationId, clinicId and picture */}
        </section>

        <LocationSection
          locations={formData.locations}
          catId={catId}
          catLocationId={selectedFormValues.locationId}
        />
        <TextInput
          name="clinicId"
          label="Clínica Asignada"
          ref={clinicIdRef}
          placeholder="Clínica Asignada"
          // defaultValue={selectedFormValues?.clinicId ?? ''}
        />
        <section className="catPage__buttonsSection">
          <button className="button button-cancel">Cancelar</button>
          <button className="button button-save" type="submit">
            {' '}
            Guardar Cambios{' '}
          </button>
        </section>
      </form>
    </>
  );
};
