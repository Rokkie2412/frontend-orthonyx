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

export type LabDataResult = {
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