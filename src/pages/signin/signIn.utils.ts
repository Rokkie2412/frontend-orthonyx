import * as yup from 'yup'

import { connectionRefused } from '../../shared/utils'

import type { SignResponse } from './signin.types'

export const signInApiCall = async (email: string, password: string): Promise<SignResponse> => {
  const url = 'http://localhost:3005/auth/signin';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to sign in');
    }

    return responseData;
  } catch (err: unknown) {
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
};

export const signInValidationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})
