import * as yup from 'yup'

import { connectionRefused } from '../../shared/utils'

import type { SignUpRequest, SignResponse } from './signUp.types'

export const signUpApiCall = async (requestBody: SignUpRequest): Promise<SignResponse> => {
  const { firstName, lastName, email, password, dob, phone } = requestBody;
  const url = 'http://localhost:3005/auth/signup';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ firstName, lastName, email, password, dob, phone  })
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to sign up');
    }

    return responseData;
  } catch (err: unknown) {
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
};

export const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  dob: yup.date().required('Date of birth is required'),
  phone: yup.string().required('Phone number is required').max(14, 'Phone number maximum characters is 14'),
})
