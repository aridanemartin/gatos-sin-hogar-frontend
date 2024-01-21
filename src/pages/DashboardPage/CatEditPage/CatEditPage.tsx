import { useRef, useState, useEffect, ChangeEvent, useContext } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';
import { useParams } from 'react-router-dom';
import { UseFormSetupData } from '@hooks/UseFormSetupData';
import { CatFormFields, GenderType } from '@interfaces/CatForm';
import { MapModal } from '@components/MapModal/MapModal';
import { CatEditFormContext } from '@contexts/CatFormContext';
import './CatEditPage.scss';

const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export const CatEditPage = () => {
  const { formValues, setFormValues } = useContext(CatEditFormContext);
  const { catId } = useParams();

  console.log('===formValues==>', formValues);

  const [errors, setErrors] = useState({
    name: false,
    description: false,
    personality: false,
    gender: false,
    hasChip: false,
    picture: false,
    breedId: false,
    birthDate: false,
    spayedNeutered: false,
    medicalConditions: false,
    dietaryNeeds: false,
    hasPassedAway: false,
    locationId: false,
    clinicId: false
  });

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
  const [modalOpen, setModalOpen] = useState(false);

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
        const data = await res.json();

        const updatedCatData = {
          name: data?.name,
          gender: data?.gender || 'UNKNOWN',
          birthDate: data?.birth_date || '',
          description: data?.description || '',
          personality: data?.personality || '',
          hasChip: data?.has_chip || '',
          picture: data?.picture || '',
          breedId: data?.breed_id || '',
          spayedNeutered: data?.spayed_neutered || '',
          medicalConditions: data?.medical_conditions || '',
          dietaryNeeds: data?.dietary_needs || '',
          hasPassedAway: data?.has_passed_away,
          locationId: data?.location_id || '',
          clinicId: data?.clinic_id || ''
        };

        setFormValues(updatedCatData);
      } catch (error) {
        console.log(error);
      }
    };

    if (catId) fetchCatData();
  }, [catId]);

  const formData = UseFormSetupData();

  const validateField = (field: string, value: string) => {
    const isError =
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '');
    setErrors((prevErrors) => ({ ...prevErrors, [field]: isError }));
    return isError;
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields: CatFormFields = {
      name: nameRef?.current?.value,
      description: descriptionRef?.current?.value,
      personality: personalityRef?.current?.value,
      gender: (genderRef?.current?.value as GenderType) || 'UNKNOWN',
      hasChip: Boolean(hasChipRef?.current?.value),
      picture: pictureRef?.current?.value,
      breedId: breedIdRef?.current?.value,
      birthDate: birthDateRef?.current?.value,
      spayedNeutered: Boolean(spayedNeuteredRef?.current?.value),
      medicalConditions: medicalConditionsRef?.current?.value,
      dietaryNeeds: dietaryNeedsRef?.current?.value,
      hasPassedAway: Boolean(hasPassedAwayRef?.current?.value),
      locationId: locationIdRef?.current?.value,
      clinicId: clinicIdRef?.current?.value
    };

    const hasError = Object.keys(formFields).some((field) =>
      validateField(field, formFields[field])
    );

    if (!hasError) {
      console.log('Form submitted successfully');

      try {
        await fetch(`${baseUrl}/cats/${catId ?? ''}`, {
          method: catId ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formFields)
        });
      } catch (error) {
        console.log('error!');
      }
    }
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
          error={errors.name}
        />
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
            error={errors.birthDate}
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
          error={errors.description}
        />
        <TextInput
          name="personality"
          label="Personalidad"
          ref={personalityRef}
          placeholder="Personalidad"
          defaultValue={formValues.personality}
          error={errors.personality}
        />
      </section>
      <TextAreaInput
        name="medical_conditions"
        label="Condiciones Médicas"
        placeholder="Condiciones Médicas"
        ref={medicalConditionsRef}
        defaultValue={formValues.medicalConditions}
        error={errors.medicalConditions}
      />
      <section className="catPage__healthRecordsSection">
        <h2>Historial Médico:</h2>
        <TextAreaInput
          name="dietary_needs"
          label="Dieta Específica"
          placeholder="Dieta Específica"
          ref={dietaryNeedsRef}
          defaultValue={formValues.dietaryNeeds}
          error={errors.dietaryNeeds}
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
          error={errors.picture}
        />
      </section>
      <section className="catPage__locationSection">
        <h2>Localización:</h2>
        <TextInput
          name="location"
          label="Localización"
          ref={locationIdRef}
          placeholder="Ubicación"
          defaultValue={formValues?.locationId ?? ''}
          error={errors.locationId}
        />
        <TextInput
          name="clinicId"
          label="Clínica Asignada"
          ref={clinicIdRef}
          placeholder="Clínica Asignada"
          defaultValue={formValues?.clinicId ?? ''}
          error={errors.clinicId}
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
      <input type="submit" />
    </form>
  );
};
