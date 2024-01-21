import { Gender } from '@interfaces/CatForm';
import React, { createContext, useState, ReactNode } from 'react';

const initialFormValues = {
  name: '',
  description: '',
  personality: '',
  gender: 'UNKNOWN' as unknown as Gender,
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
};

interface CatEditFormValues {
  name: string;
  description: string;
  personality: string;
  gender: Gender;
  hasChip: boolean;
  picture: string;
  breedId: string;
  birthDate: string;
  spayedNeutered: boolean;
  medicalConditions: string;
  dietaryNeeds: string;
  hasPassedAway: boolean;
  locationId: string;
  clinicId: string;
}

// Define the context type
interface CatEditFormContextProps {
  formValues: CatEditFormValues;
  setFormValues: React.Dispatch<React.SetStateAction<CatEditFormValues>>;
}

// Create the context with an initial state
const CatEditFormContext = createContext<CatEditFormContextProps>({
  formValues: initialFormValues,
  setFormValues: () => {}
});

// Create a provider component to wrap around your application
const CatEditFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formValues, setFormValues] =
    useState<CatEditFormValues>(initialFormValues);

  return (
    <CatEditFormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </CatEditFormContext.Provider>
  );
};

export { CatEditFormContext, CatEditFormContextProvider };
