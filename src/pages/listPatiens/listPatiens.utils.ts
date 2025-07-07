import * as yup from 'yup'

import type { AddUserTypes, GetAllUser } from "./listPatient.types";

import {connectionRefused, getItemFromCookies} from '../../shared/utils'

export const addNewUser = async ({
  firstName,
  lastName,
  email,
  dob,
  phone,
  gender
}: AddUserTypes) => {
  const { cookieAccessToken, apiKey } = getItemFromCookies();
  const url = 'http://localhost:3005/user/newUser'

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookieAccessToken}`,
        'x-api-key': apiKey
      },
      body: JSON.stringify({ firstName, lastName, email, dob, phone, gender })
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to retrive Data');
    }

    return responseData;
  } catch (err: unknown) {
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}

export const getAllUser = async (): Promise<GetAllUser> => {
  const { cookieAccessToken, apiKey } = getItemFromCookies();
  const url = `http://localhost:3005/user/all`

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookieAccessToken}`,
        'x-api-key': apiKey
      },
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to retrive Data');
    }

    return responseData;
  } catch (err: unknown) {
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
} 

export const addDataUserValidationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  dob: yup.date().required('Date of birth is required'),
  phone: yup.string().required('Phone number is required').max(14, 'Phone number maximum characters is 14'),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female', 'other'], 'Gender must be male, female, or other'),
})