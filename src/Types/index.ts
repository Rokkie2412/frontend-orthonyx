import type { ChangeEvent, SetStateAction } from "react"

export type voidFnInput = (e: ChangeEvent<HTMLInputElement>) => void | string
export type Setter<T> = (value: SetStateAction<T>) => void;
export type ErrorState = {
  show: boolean;
  message: string;
}

export type SignUpRequest = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  dob: Date,
  phone: string
}

export type SignResponse = {
  token: {
    accessToken: string
    apiKey: string,
    expiresIn: string
  },
  user: {
    dob: string,
    phone: string,
    lastName: string,
    firstName: string,
    email: string,
    id: string,
    createdAt: string
  }
  message?: string;
}

export type UserProfile = {
  _id?: string,
  firstName: string,
  lastName: string,
  email: string,
  dob: Date | string, 
  phone: string,
  gender: string,
  userId?: string,
  createdAt?: Date | string,
  updatedAt?: Date | string,
};

export type UserProfilesData = {
  message: string
  user: UserProfile
};

export type CookiesType = {
  cookieUserId: string,
  cookieAccessToken: string,
  apiKey: string
}

type LabDataResult = {
  bloodPressure: {
    systolic: number,
    diastolic: number
  },
  cholesterol: {
    total?: number,
    ldl: number,
    hdl: number
  },
    glucose: number
}

export type LabData = {
createdAt: string,
date: string,
id: string,
results: LabDataResult,
  updatedAt: string,
  userId: string
}

export type LabDataResponse = {
  message: string
  labResults: LabData[]
}

export type TooltipEntry =  {
  name: string;
  value: number | string;
  color: string;
  dataKey: string;
}

export type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipEntry[];
  label?: string;
}

export type AddLabDataTypes = {
  date: Date,
  result: LabDataResult,
  patientId: string
}

export type PatienceList = Array<UserProfile>

export type AddUserTypes = {
  firstName: string,
  lastName: string,
  email: string,
  dob: Date,
  phone: string,
  gender: string
}