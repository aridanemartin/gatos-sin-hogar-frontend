import { CatFormFields } from '@interfaces/CatForm';
import React, { createContext, useState, ReactNode } from 'react';

const initialFormValues: CatFormFields = {
  name: '',
  description: '',
  personality: '',
  gender: 'UNKNOWN',
  hasChip: false,
  picture: '',
  breedId: null,
  birthDate: '',
  spayedNeutered: false,
  medicalConditions: '',
  dietaryNeeds: '',
  hasPassedAway: false,
  locationId: null,
  clinicId: null
};

interface CatEditFormContextProps {
  formValues: CatFormFields;
  setFormValues: React.Dispatch<React.SetStateAction<CatFormFields>>;
}

const CatEditFormContext = createContext<CatEditFormContextProps>({
  formValues: initialFormValues,
  setFormValues: () => {}
});

const CatEditFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formValues, setFormValues] =
    useState<CatFormFields>(initialFormValues);

  return (
    <CatEditFormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </CatEditFormContext.Provider>
  );
};

export { CatEditFormContext, CatEditFormContextProvider };
