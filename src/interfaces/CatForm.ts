import { z } from 'zod';

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
}

const invalid_type_error = 'Utilice un tipo de dato válido';
const required_error = 'Este campo es requerido';
const required_minimum_20 =
  'Este campo es requerido y debe tener al menos 20 caracteres';
const value_too_long = 'El valor es muy largo';

export const CatFormSchema = z.object({
  name: z
    .string({ invalid_type_error })
    .min(1, required_error)
    .max(255, value_too_long),
  description: z
    .string({ required_error, invalid_type_error })
    .min(20, required_minimum_20)
    .max(255),
  personality: z
    .string({ required_error, invalid_type_error })
    .min(20, required_minimum_20)
    .max(255),
  gender: z.enum(['UNKNOWN', 'MALE', 'FEMALE']),
  hasChip: z.boolean(),
  picture: z.string(),
  breedId: z.number().nullable(),
  birthDate: z.string(),
  spayedNeutered: z.boolean().nullable(),
  medicalConditions: z.string().optional(),
  dietaryNeeds: z.string().optional(),
  hasPassedAway: z.boolean().nullish(),
  locationId: z.number().nullable(),
  clinicId: z.number().nullable()
});

export const CatApiFormSchema = z.object({
  name: z.string().nullable(),
  description: z.string().nullable(),
  personality: z.string().nullable(),
  gender: z.enum(['UNKNOWN', 'MALE', 'FEMALE']),
  has_chip: z.number(),
  picture: z.any(),
  breed_id: z.number().nullable(),
  birth_date: z.string().nullable(),
  spayed_neutered: z.number().nullable(),
  medical_conditions: z.string().nullable(),
  dietary_needs: z.string().nullable(),
  has_passed_away: z.number().nullable(),
  location_id: z.number().nullable(),
  clinic_id: z.number().nullable()
});

export const CatLocationFormSchema = z.object({
  name: z
    .string({ invalid_type_error })
    .min(1, required_error)
    .max(255, value_too_long),
  description: z.optional(z.string({ invalid_type_error }).max(255).nullable()),
  x_coord: z.number(),
  y_coord: z.number()
});

export const CatLocationApiFormSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  x_coord: z.number(),
  y_coord: z.number()
});

export type CatFormFields = z.infer<typeof CatFormSchema>;
export type CatApiFormFields = z.infer<typeof CatApiFormSchema>;
export type CatLocationFormFields = z.infer<typeof CatLocationFormSchema>;
export type CatLocationApiFormFields = z.infer<typeof CatLocationApiFormSchema>;
