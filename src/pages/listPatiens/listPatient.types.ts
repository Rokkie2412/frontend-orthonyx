import type { UserProfile, LabDataResult } from '../../shared/types'

export type AddPatientProps = {
  isOpen: boolean;
  onCloseFn: () => void;
  onSuccess?: () => void;
}

export type FormikPropsData = {
  firstName: string;
  lastName: string;
  dob: Date;
  phone: string;
  email: string;
  gender: string;
}

export type AddUserTypes = {
  firstName: string,
  lastName: string,
  email: string,
  dob: Date,
  phone: string,
  gender: string
}

export type AddLabDataTypes = {
  date: Date,
  result: LabDataResult,
  patientId: string
}

export type GetAllUser = {
  message: string,
  user: UserProfile[]
}