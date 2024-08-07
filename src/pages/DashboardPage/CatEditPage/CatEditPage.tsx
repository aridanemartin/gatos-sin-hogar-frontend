import { useRef, useState, useEffect, ChangeEvent, useContext } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';
import { useParams } from 'react-router-dom';
import { UseFormSetupData } from '@hooks/UseFormSetupData';
import { CatFormFields, CatFormSchema, GenderType } from '@interfaces/CatForm';
import { MapModal } from '@components/MapModal/MapModal';
import { CatEditFormContext } from '@contexts/CatFormContext';
import './CatEditPage.scss';
import { ZodError, typeToFlattenedError } from 'zod';

import UseToast from '@hooks/UseToast';
import { environment } from '@consts/environments';
import { FetchCatDataResult, useFetchCatData } from '@hooks/useFetchCatData';
import { FileInput } from '@components/Inputs/FileInput/FileInput';

export const CatEditPage = ({ isEditPage }: { isEditPage?: boolean }) => {
  const { baseUrl } = environment;
  const { catId } = useParams();
  const { toastSuccess, toastError } = UseToast();
  const [modalOpen, setModalOpen] = useState(false);
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
  const descriptionRef = useRef<HTMLInputElement>(null);
  const personalityRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const hasChipRef = useRef<HTMLSelectElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const breedIdRef = useRef<HTMLSelectElement>(null);
  const birthDateRef = useRef<HTMLInputElement>(null);
  const spayedNeuteredRef = useRef<HTMLSelectElement>(null);
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

  const openMapModal = () => {
    setModalOpen(true);
  };

  const closeMapModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    if (catData && isEditPage) {
      setSelectedFormValues(catData);
    }
  }, [catData, setSelectedFormValues, isEditPage]);

  const formData = UseFormSetupData();
  const selectedLocation = formData.locations.find(
    (location) => location.id === selectedFormValues.locationId
  );

  const handleCatFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields: CatFormFields = {
      name: nameRef?.current?.value || '',
      description: descriptionRef?.current?.value || '',
      personality: personalityRef?.current?.value || '',
      gender: (genderRef?.current?.value as GenderType) || 'UNKNOWN',
      hasChip: Boolean(hasChipRef?.current?.value === 'true'),
      picture: pictureRef?.current?.value || '',
      breedId: Number(breedIdRef?.current?.value) || 0,
      birthDate: birthDateRef?.current?.value || '',
      spayedNeutered: Boolean(spayedNeuteredRef?.current?.value === 'true'),
      medicalConditions: medicalConditionsRef?.current?.value || '',
      dietaryNeeds: dietaryNeedsRef?.current?.value || '',
      hasPassedAway: Boolean(hasPassedAwayRef?.current?.value === 'true'),
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
    <form onSubmit={handleCatFormSubmit} className="catPage__form">
      <section className="catPage__header">
        <TextInput
          name="name"
          label="Nombre"
          ref={nameRef}
          placeholder="Nombre"
          defaultValue={selectedFormValues.name}
          error={errors?.fieldErrors?.name && errors?.fieldErrors?.name[0]}
        />
      </section>
      <section className="catPage__buttonsSection">
        <button className="button button-cancel">Cancelar</button>
        <button className="button button-save" type="submit">
          {' '}
          Guardar Cambios{' '}
        </button>
      </section>

      <section className="catPage__generalInformationSection">
        <h2>Información General</h2>
        <div className="catPage__generalInformationInputs">
          <SelectInput
            name="gender"
            label="Género"
            options={formData.genders}
            ref={genderRef}
            defaultValue={selectedFormValues.gender as unknown as string}
          />
          <SelectInput
            name="chip"
            label="Chip"
            isBooleanSelect={true}
            ref={hasChipRef}
            defaultValue={Boolean(selectedFormValues.hasChip).toString()}
          />
          <SelectInput
            name="breed"
            label="Raza"
            hasEnumeratedOptions={true}
            options={formData.breeds}
            ref={breedIdRef}
          />
          <DateInput
            name="birth_date"
            label="Fecha de nacimiento"
            ref={birthDateRef}
            defaultValue={selectedFormValues.birthDate}
            // error={errors?.fieldErrors?.birthDate[0]}
          />
          <SelectInput
            name="spayed"
            label="Castrado/Esterilizado"
            isBooleanSelect={true}
            ref={spayedNeuteredRef}
            defaultValue={Boolean(selectedFormValues.spayedNeutered).toString()}
          />
          <SelectInput
            name="passed"
            label="Ha Fallecido"
            isBooleanSelect={true}
            ref={hasPassedAwayRef}
            defaultValue={Boolean(selectedFormValues.hasPassedAway).toString()}
          />
        </div>
      </section>
      <section className="catPage__aboutSection">
        <h2>
          {selectedFormValues?.name
            ? `Sobre ${selectedFormValues.name}:`
            : 'Sobre el/la gato/a:'}
        </h2>
        <TextInput
          name="description"
          label="Descripción"
          ref={descriptionRef}
          placeholder="Descripción"
          defaultValue={selectedFormValues.description}
          error={
            errors?.fieldErrors?.description &&
            errors?.fieldErrors?.description[0]
          }
        />
        <TextInput
          name="personality"
          label="Personalidad"
          ref={personalityRef}
          placeholder="Personalidad"
          defaultValue={selectedFormValues.personality}
          error={
            errors?.fieldErrors?.personality &&
            errors?.fieldErrors?.personality[0]
          }
        />
      </section>

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
      <section className="catPage__imageSection">
        <FileInput
          name="catPicture"
          label="Cat Picture"
          ref={catImageRef}
          onReset={handleResetImage}
        />
      </section>
      <section className="catPage__locationSection">
        <h2>Localización:</h2>
        {selectedLocation?.name ?? 'Localización desconocida'}
        <TextInput
          name="clinicId"
          label="Clínica Asignada"
          ref={clinicIdRef}
          placeholder="Clínica Asignada"
          // defaultValue={formValues?.clinicId ?? ''}
        />
        {modalOpen && (
          <MapModal
            catId={catId}
            catLocationId={selectedFormValues.locationId}
            locations={formData.locations}
            closeModal={closeMapModal}
          />
        )}
        <button onClick={openMapModal}>Abrir Mapa</button>
      </section>
    </form>
  );
};
