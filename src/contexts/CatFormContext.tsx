import type { CatFormFields } from '@interfaces/CatForm';
import type React from 'react';
import { createContext, useState, type ReactNode } from 'react'

const InitialFormValues: CatFormFields = {
  name: '',
  description: '',
  personality: '',
  gender: 'UNKNOWN',
  hasChip: false,
  picture: '',
  breedId: null,
  birthDate: '',
  spayedNeutered: false,
  hasLeukemia: null,
  medicalConditions: '',
  dietaryNeeds: '',
  hasPassedAway: false,
  locationId: null,
  clinicId: null
};

interface CatEditFormContextProps {
  selectedFormValues: CatFormFields;
  setSelectedFormValues: React.Dispatch<React.SetStateAction<CatFormFields>>;
}

const CatEditFormContext = createContext<CatEditFormContextProps>({
  selectedFormValues: InitialFormValues,
  setSelectedFormValues: () => {}
});

const CatEditFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [selectedFormValues, setSelectedFormValues] =
    useState<CatFormFields>(InitialFormValues);

  return (
    <CatEditFormContext.Provider
      value={{
        selectedFormValues,
        setSelectedFormValues
      }}
    >
      {children}
    </CatEditFormContext.Provider>
  );
};

export { CatEditFormContext, CatEditFormContextProvider };
