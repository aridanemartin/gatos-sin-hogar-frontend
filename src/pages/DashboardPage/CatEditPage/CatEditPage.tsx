import { useRef, useState, useContext, useEffect, ChangeEvent } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';
import { useParams } from 'react-router-dom';
import { Modal } from '@components/Modal/Modal';
import { Map } from '@components/Map/Map';
import { LocationsList } from '@components/LocationsList/LocationsList';
import { UseDefaultCatLocation } from '@hooks/UseDefaultCatLocation';
import { UseFormSetupData } from '@hooks/UseFormSetupData';
import { CatFormFields, GenderType } from '@interfaces/CatForm';
import { LatLngExpression } from 'leaflet';
import { MapModal } from '@components/MapModal/MapModal';

export const CatEditPage = () => {
  const { catId } = useParams();
  const [catData, setCatData] = useState({
    name: '',
    description: '',
    personality: '',
    gender: 'UNKNOWN',
    hasChip: false,
    picture: '',
    breedId: '',
    birthDate: '',
    spayedNeutered: false,
    medicalConditions: '',
    dietaryNeeds: '',
    hasPassedAway: false,
    locationId: '',
    clinicId: ''
  });

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

  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

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

        setCatData(updatedCatData);
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
    <form onSubmit={handleSubmit}>
      <TextInput
        name="name"
        label="Nombre"
        ref={nameRef}
        placeholder="Nombre"
        defaultValue={catData.name}
        error={errors.name}
      />
      <TextInput
        name="description"
        label="Descripción"
        ref={descriptionRef}
        placeholder="Descripción"
        defaultValue={catData.description}
        error={errors.description}
      />
      <TextInput
        name="personality"
        label="Personalidad"
        ref={personalityRef}
        placeholder="Personalidad"
        defaultValue={catData.personality}
        error={errors.personality}
      />
      <SelectInput
        name="gender"
        label="Género"
        options={formData.genders}
        ref={genderRef}
        defaultValue={catData.gender}
      />
      <SelectInput
        name="chip"
        label="Chip"
        isBooleanSelect={true}
        ref={hasChipRef}
        defaultValue={Boolean(catData.hasChip).toString()}
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
        defaultValue={catData.birthDate}
        error={errors.birthDate}
      />
      <SelectInput
        name="spayed"
        label="Castrado/Esterilizado"
        isBooleanSelect={true}
        ref={spayedNeuteredRef}
        defaultValue={Boolean(catData.spayedNeutered).toString()}
      />
      <TextAreaInput
        name="medical_conditions"
        label="Condiciones Médicas"
        placeholder="Condiciones Médicas"
        ref={medicalConditionsRef}
        defaultValue={catData.medicalConditions}
        error={errors.medicalConditions}
      />
      <TextAreaInput
        name="dietary_needs"
        label="Dieta Específica"
        placeholder="Dieta Específica"
        ref={dietaryNeedsRef}
        defaultValue={catData.dietaryNeeds}
        error={errors.dietaryNeeds}
      />
      <SelectInput
        name="passed"
        label="Ha Fallecido"
        isBooleanSelect={true}
        ref={hasPassedAwayRef}
        defaultValue={Boolean(catData.hasPassedAway).toString()}
      />

      {/* TODO: This inputs are set temporary. Remember to change it for the real
        locationId, clinicId and picture */}
      <TextInput
        name="picture"
        label="Foto"
        ref={pictureRef}
        placeholder="Imagen del gato"
        defaultValue={catData.picture}
        error={errors.picture}
      />
      <TextInput
        name="location"
        label="Localización"
        ref={locationIdRef}
        placeholder="Ubicación"
        defaultValue={catData?.locationId ?? ''}
        error={errors.locationId}
      />
      <TextInput
        name="clinicId"
        label="Clínica Asignada"
        ref={clinicIdRef}
        placeholder="Clínica Asignada"
        defaultValue={catData?.clinicId ?? ''}
        error={errors.clinicId}
      />
      {modalOpen && (
        <MapModal
          catId={catId}
          catLocationId={catData.locationId}
          locations={formData.locations}
          closeModal={closeMapModal}
        />
      )}
      <button onClick={openMapModal}>Abrir Mapa</button>
      <input type="submit" />
    </form>
  );
};
