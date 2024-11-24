import { TextInput } from '@components/Inputs/TextInput/TextInput';
import { CatFormFields } from '@interfaces/CatForm';
import React from 'react';
import { typeToFlattenedError } from 'zod';
import './AboutCatSection.scss';

interface AboutCatSectionProps {
  descriptionRef: React.MutableRefObject<HTMLInputElement | null>;
  personalityRef: React.MutableRefObject<HTMLInputElement | null>;
  selectedFormValues: CatFormFields;
  errors: typeToFlattenedError<CatFormFields>;
}

export const AboutCatSection = ({
  descriptionRef,
  personalityRef,
  selectedFormValues,
  errors
}: AboutCatSectionProps) => {
  return (
    <section className="aboutCatSection">
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
        isFullWidth
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
        isFullWidth
      />
    </section>
  );
};
