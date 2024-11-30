import { DateInput } from '@components/Inputs/DateInput/DateInput';
import { SelectInput } from '@components/Inputs/SelectInput/SelectInput';
import { TextInput } from '@components/Inputs/TextInput/TextInput';
import React from 'react';
import './GeneralInformationSection.scss';
import { CatFormData, CatFormFields } from '@interfaces/CatForm';
import { typeToFlattenedError } from 'zod';
import { ImageInput } from '@components/Inputs/FileInput/ImageInput';

interface GeneralInformationProps {
  nameRef: React.MutableRefObject<HTMLInputElement | null>;
  genderRef: React.MutableRefObject<HTMLSelectElement | null>;
  hasChipRef: React.MutableRefObject<HTMLSelectElement | null>;
  breedIdRef: React.MutableRefObject<HTMLSelectElement | null>;
  birthDateRef: React.MutableRefObject<HTMLInputElement | null>;
  spayedNeuteredRef: React.MutableRefObject<HTMLSelectElement | null>;
  hasLeukemiaRef: React.MutableRefObject<HTMLSelectElement | null>;
  hasPassedAwayRef: React.MutableRefObject<HTMLSelectElement | null>;
  catImageRef: React.MutableRefObject<HTMLInputElement | null>;
  selectedFormValues: CatFormFields;
  handleResetImage: () => void;
  formData: CatFormData;
  errors: typeToFlattenedError<CatFormFields>;
}

export const GeneralInformationSection = ({
  nameRef,
  genderRef,
  hasChipRef,
  breedIdRef,
  birthDateRef,
  spayedNeuteredRef,
  hasLeukemiaRef,
  hasPassedAwayRef,
  catImageRef,
  selectedFormValues,
  handleResetImage,
  formData,
  errors
}: GeneralInformationProps) => {
  return (
    <section className="generalInformationSection">
      <h2>Información General</h2>
      <div className="generalInformationInputs">
        <div className="generalInformationInputs__imageInput">
          <ImageInput
            name="picture"
            label="Foto: "
            defaultImage={selectedFormValues.picture}
            ref={catImageRef}
            onReset={handleResetImage}
          />
        </div>
        <div className="generalInformationInputs__textInputs">
          <TextInput
            name="name"
            label="Nombre"
            ref={nameRef}
            placeholder="Nombre"
            defaultValue={selectedFormValues.name}
            error={errors?.fieldErrors?.name && errors?.fieldErrors?.name[0]}
            isFullWidth
          />
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
            name="leukemia"
            label="FeLV (Leucemia Felina)"
            isBooleanSelect={true}
            ref={hasLeukemiaRef}
            defaultValue={
              selectedFormValues.hasLeukemia === null
                ? 'null'
                : Boolean(selectedFormValues.hasLeukemia).toString()
            }
          />
          <SelectInput
            name="passed"
            label="Ha Fallecido"
            isBooleanSelect={true}
            ref={hasPassedAwayRef}
            defaultValue={Boolean(selectedFormValues.hasPassedAway).toString()}
          />
        </div>
      </div>
    </section>
  );
};
