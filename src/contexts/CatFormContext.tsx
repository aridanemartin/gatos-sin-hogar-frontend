import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the type for your form values
interface FormValues {
  username: string;
  email: string;
  password: string;
}

// Define the context type
interface FormContextProps {
  formValues: FormValues;
  setFormValues: React.Dispatch<React.SetStateAction<FormValues>>;
}

// Create the context with an initial state
const FormContext = createContext<FormContextProps | undefined>(undefined);

// Create a provider component to wrap around your application
const CatFormContextProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const [formValues, setFormValues] = useState<FormValues>({
    username: '',
    email: '',
    password: ''
  });

  return (
    <FormContext.Provider value={{ formValues, setFormValues }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, CatFormContextProvider };
