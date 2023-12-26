import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { TextAreaInput } from '@components/Inputs/TextAreaInput/TextAreaInput';

export const CatEditPage = () => {
  const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
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

  const [errors, setErrors] = useState({
    name: false,
    description: false,
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
  const [formData, setFormData] = useState({
    genders: [],
    breeds: [],
    locations: [],
    clinics: [],
    vaccines: [],
    incidents: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genders, breeds, locations, clinics, vaccines, incidents] =
          await Promise.all([
            fetch(`${baseUrl}/genders`).then((res) => res.json()),
            fetch(`${baseUrl}/breeds`).then((res) => res.json()),
            fetch(`${baseUrl}/locations`).then((res) => res.json()),
            fetch(`${baseUrl}/clinics`).then((res) => res.json()),
            fetch(`${baseUrl}/vaccines`).then((res) => res.json()),
            fetch(`${baseUrl}/incidents`).then((res) => res.json())
          ]);
        setFormData({
          genders,
          breeds,
          locations,
          clinics,
          vaccines,
          incidents
        });
      } catch (error) {
        console.log('error!');
      }
    };

    fetchData();
  }, []);

  const validateField = (field: string, value: any) => {
    const isError =
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '');
    setErrors((prevErrors) => ({ ...prevErrors, [field]: isError }));
    return isError;
  };
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formFields = {
      name: nameRef?.current?.value,
      description: descriptionRef?.current?.value,
      gender: genderRef?.current?.value || 'UNKNOWN',
      hasChip: Boolean(hasChipRef?.current?.value),
      picture: pictureRef?.current?.value,
      breedId: breedIdRef?.current?.value,
      birthDate: birthDateRef?.current?.value,
      spayedNeutered: spayedNeuteredRef?.current?.value,
      medicalConditions: medicalConditionsRef?.current?.value,
      dietaryNeeds: dietaryNeedsRef?.current?.value,
      hasPassedAway: Boolean(hasPassedAwayRef?.current?.value),
      locationId: locationIdRef?.current?.value || 3,
      clinicId: clinicIdRef?.current?.value || 3
    };

    const hasError = Object.keys(formFields).some((field) =>
      validateField(field, formFields[field])
    );

    if (!hasError) {
      console.log('Form submitted successfully');

      try {
        await fetch(`${baseUrl}/cats`, {
          method: 'POST',
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

  console.log('errores===>', errors);
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        name="name"
        label="Nombre"
        ref={nameRef}
        placeholder="Nombre"
      />
      <TextInput
        name="description"
        label="Descripción"
        ref={descriptionRef}
        placeholder="Descripción"
      />
      <SelectInput
        name="gender"
        label="Género"
        options={formData.genders}
        ref={genderRef}
      />
      <SelectInput
        name="chip"
        label="Chip"
        isBooleanSelect={true}
        ref={hasChipRef}
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
      />
      <SelectInput
        name="spayed"
        label="Castrado/Esterilizado"
        isBooleanSelect={true}
        ref={spayedNeuteredRef}
      />
      <TextAreaInput
        name="medical_conditions"
        label="Condiciones Médicas"
        placeholder="Condiciones Médicas"
        ref={medicalConditionsRef}
      />
      <TextAreaInput
        name="dietary_needs"
        label="Dieta Específica"
        placeholder="Dieta Específica"
        ref={dietaryNeedsRef}
      />
      <SelectInput
        name="passed"
        label="Ha Fallecido"
        isBooleanSelect={true}
        ref={hasPassedAwayRef}
      />

      {/* TODO: This inputs are set temporary. Remember to change it for the real
        locationId, clinicId and picture */}
      <TextInput
        name="picture"
        label="Foto"
        ref={pictureRef}
        placeholder="Imagen del gato"
      />
      <TextInput
        name="location"
        label="Localización"
        ref={locationIdRef}
        placeholder="Ubicación"
      />
      <TextInput
        name="clinicId"
        label="Clínica Asignada"
        ref={clinicIdRef}
        placeholder="Clínica Asignada"
      />
      <input type="submit" />
    </form>
  );
};
