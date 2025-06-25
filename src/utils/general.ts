import * as yup from 'yup';

import { format } from 'date-fns';
import Papa from 'papaparse';
import type { LabData } from '../Types';

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  dob: yup.date().required('Date of birth is required'),
  phone: yup.string().required('Phone number is required').max(14, 'Phone number maximum characters is 14'),
})

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const AddLabDataValidationSchema = yup.object().shape({
  date: yup.date().required('Date is required'),
  glucose: yup.number().required('Glucose is required').min(1, 'Glucose must be at least 1'),
  bloodPreasure: yup.object().shape({
    systolic: yup.number().required('Systolic is required').min(1, 'Systolic must be at least 1'),
    diastolic: yup.number().required('Diastolic is required').min(1, 'Diastolic must be at least 1'),
  }),
  cholesterol: yup.object().shape({
    hdl: yup.number().required('HDL is required').min(1, 'HDL must be at least 1'),
    ldl: yup.number().required('LDL is required').min(1, 'LDL must be at least 1'),
  }),
})

export const cookiesSetting = (): Cookies.CookieAttributes => ({
  secure: true,
  sameSite: 'Strict',
  expires: 1,
})

export const handleDownloadCSV = (labData: LabData[]) => {
  const formattedData = labData.map((item) => ({
    Date: format(new Date(item.date), 'yyyy-MM-dd'),
    Glucose: item.results.glucose,
    'Blood Pressure (Systolic)': item.results.bloodPressure.systolic,
    'Blood Pressure (Diastolic)': item.results.bloodPressure.diastolic,
    'Cholesterol (HDL)': item.results.cholesterol.hdl,
    'Cholesterol (LDL)': item.results.cholesterol.ldl,
    'Cholesterol (Total)': item.results.cholesterol.total,
  }));

  const csv = Papa.unparse(formattedData);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'lab-results.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const validationSchemaProfile = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  dob: yup.date().required('Date of birth is required'),
  phone: yup.string().required('Phone number is required').max(14, 'Phone number maximum characters is 14'),
})

export const addDataUserValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dob: yup.date().required('Date of birth is required'),
  phone: yup.string().required('Phone number is required').max(14, 'Phone number maximum characters is 14'),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
})