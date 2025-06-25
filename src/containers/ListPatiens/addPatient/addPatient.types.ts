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