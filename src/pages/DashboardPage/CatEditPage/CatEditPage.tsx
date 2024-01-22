import { useRef, useState, useEffect, ChangeEvent, useContext } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';
import { useParams } from 'react-router-dom';
import { UseFormSetupData } from '@hooks/UseFormSetupData';
import {
  CatApiFormSchema,
  CatFormFields,
  CatFormSchema,
  GenderType
} from '@interfaces/CatForm';
import { MapModal } from '@components/MapModal/MapModal';
import { CatEditFormContext } from '@contexts/CatFormContext';
import './CatEditPage.scss';
import { ZodError, typeToFlattenedError } from 'zod';

import UseToast from '@hooks/UseToast';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const CatEditPage = () => {
  const { toastSuccess, toastError } = UseToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState(
    {} as typeToFlattenedError<CatFormFields>
  );

  const { formValues, setFormValues } = useContext(CatEditFormContext);
  const { catId } = useParams();

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
  const locationIdRef = useRef<HTMLInputElement>(null);
  const clinicIdRef = useRef<HTMLInputElement>(null);

  const openMapModal = () => {
    setModalOpen(true);
  };

  const closeMapModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchCatData = async () => {
      try {
        const res = await fetch(`${baseUrl}/cats/${catId}`);
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
          medicalConditions: data?.medical_conditions || '',
          dietaryNeeds: data?.dietary_needs || '',
          hasPassedAway: Boolean(data?.has_passed_away),
          locationId: data?.location_id,
          clinicId: data?.clinic_id
        };

        setFormValues(updatedCatData);
      } catch (error) {
        if (error instanceof ZodError) {
          console.log('===zod===>', error.message);
        } else {
          console.log(error);
        }
      }
    };

    if (catId) fetchCatData();
  }, [catId, setFormValues]);

  const formData = UseFormSetupData();

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
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
      locationId: Number(locationIdRef?.current?.value),
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
        console.log('===zod===>', typeof error);

        const errorObj = error.flatten();
        setErrors(errorObj);
      } else {
        console.log(error);
        toastError('Error al guardar/actualizar el gato.');
      }
    }
    // }
  };

  return (
    <form onSubmit={handleSubmit} className="catPage__form">
      <section className="catPage__header">
        <TextInput
          name="name"
          label="Nombre"
          ref={nameRef}
          placeholder="Nombre"
          defaultValue={formValues.name}
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
            defaultValue={formValues.gender as unknown as string}
          />
          <SelectInput
            name="chip"
            label="Chip"
            isBooleanSelect={true}
            ref={hasChipRef}
            defaultValue={Boolean(formValues.hasChip).toString()}
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
            defaultValue={formValues.birthDate}
            // error={errors?.fieldErrors?.birthDate[0]}
          />
          <SelectInput
            name="spayed"
            label="Castrado/Esterilizado"
            isBooleanSelect={true}
            ref={spayedNeuteredRef}
            defaultValue={Boolean(formValues.spayedNeutered).toString()}
          />
          <SelectInput
            name="passed"
            label="Ha Fallecido"
            isBooleanSelect={true}
            ref={hasPassedAwayRef}
            defaultValue={Boolean(formValues.hasPassedAway).toString()}
          />
        </div>
      </section>
      <section className="catPage__aboutSection">
        <h2>
          {formValues?.name
            ? `Sobre ${formValues.name}:`
            : 'Sobre el/la gato/a:'}
        </h2>
        <TextInput
          name="description"
          label="Descripción"
          ref={descriptionRef}
          placeholder="Descripción"
          defaultValue={formValues.description}
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
          defaultValue={formValues.personality}
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
          defaultValue={formValues.dietaryNeeds}
        />
        <TextAreaInput
          name="medical_conditions"
          label="Condiciones Médicas"
          placeholder="Condiciones Médicas"
          ref={medicalConditionsRef}
          defaultValue={formValues.medicalConditions}
        />
        {/* TODO: This inputs are set temporary. Remember to change it for the real
          locationId, clinicId and picture */}
      </section>
      <section className="catPage__imageSection">
        <TextInput
          name="picture"
          label="Foto"
          ref={pictureRef}
          placeholder="Imagen del gato"
          defaultValue={formValues.picture}
          error={
            errors?.fieldErrors?.picture && errors?.fieldErrors?.picture[0]
          }
        />
      </section>
      <section className="catPage__locationSection">
        <h2>Localización:</h2>
        <TextInput
          name="location"
          label="Localización"
          ref={locationIdRef}
          placeholder="Ubicación"
          // defaultValue={formValues?.locationId ?? ''}
        />
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
            catLocationId={formValues.locationId}
            locations={formData.locations}
            closeModal={closeMapModal}
          />
        )}
        <button onClick={openMapModal}>Abrir Mapa</button>
      </section>
    </form>
  );
};
