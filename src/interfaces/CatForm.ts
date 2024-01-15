export interface CatBreeds {
  id: number;
  name: string;
}

export interface CatLocation {
  id: number;
  name: string;
  description: string;
  x_coord: number;
  y_coord: number;
}

export interface Clinic {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
}

export interface Incident {
  id: number;
  timestamp: string;
  title: string;
  description: string;
  cat_id: number;
  volunteer_id: number;
}

export type GenderType = 'UNKNOWN' | 'MALE' | 'FEMALE';

export interface Gender {
  id: number;
  name: GenderType;
}

export interface CatFormData {
  genders: Gender[];
  breeds: CatBreeds[];
  locations: CatLocation[];
  clinics: Clinic[];
  incidents: Incident[];
}

export interface CatFormFields {
  name: string | undefined;
  description: string | undefined;
  personality: string | undefined;
  gender: GenderType;
  hasChip: boolean | undefined;
  picture: string | undefined;
  breedId: string | undefined;
  birthDate: string | undefined;
  spayedNeutered: boolean | undefined;
  medicalConditions: string | undefined;
  dietaryNeeds: string | undefined;
  hasPassedAway: boolean;
  locationId: string | undefined;
  clinicId: string | undefined;
}
