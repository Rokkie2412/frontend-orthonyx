import Cookies from 'js-cookie';

import type {
  AddLabDataTypes,
  AddUserTypes,
  CookiesType,
  GetAllUser,
  LabDataResponse,
  SignResponse,
  SignUpRequest,
  UserProfilesData
} from '../Types';

const _connectionRefused = (errorMessage: string): void => {
  const errorIncludes = ['Failed to fetch', 'NetworkError', 'ERR_CONNECTION_REFUSED']

  if (errorIncludes.some((error) => errorMessage.includes(error))) {
    throw new Error('Cannot connect to the server. Please check your connection and refresh the page.');
  }
}

export const getItemFromCookies = (): CookiesType => {
  const cookieUserId = Cookies.get('userId')?.replace(/"/g, '').trim() || '';
  const cookieAccessToken = Cookies.get('accessToken')?.replace(/"/g, '').trim() || '';
  const apiKey = Cookies.get('apiKey')?.replace(/"/g, '').trim() || '';

  return {
    cookieUserId,
    cookieAccessToken,
    apiKey
  }
}

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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
};

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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
};

export const getUserProfile = async (userId: string): Promise<UserProfilesData> =>{
  const { cookieAccessToken, apiKey } = getItemFromCookies();
  const url = `http://localhost:3005/user/profiles?userId=${userId}`;
  
  try {
    if (!cookieAccessToken || !apiKey || !userId) {
      throw new Error('No authentication credentials found');
    }

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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}

export const getLabDataByUserId = async (patientId: string, limit?: number): Promise<LabDataResponse> => {
  const { cookieAccessToken, apiKey } = getItemFromCookies();
  const url = `http://localhost:3005/lab/result?userId=${patientId}${limit ? `&limit=${limit}` : ''}`

  try {
    if (!cookieAccessToken || !apiKey || !patientId) {
      throw new Error('No authentication credentials found');
    }

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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}

export const addNewLabData = async ({
  date,
  result,
  patientId
}: AddLabDataTypes) => {
  const { cookieAccessToken, apiKey } = getItemFromCookies();
  const url = 'http://localhost:3005/lab/result'

  try {
    if (!cookieAccessToken || !apiKey || !patientId) {
      throw new Error('No authentication credentials found');
    }

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cookieAccessToken}`,
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        userId: patientId,
        date: date,
        result: {
          glucose: Number(result.glucose),
          bloodPressure: {
            systolic: Number(result.bloodPressure.systolic),
            diastolic: Number(result.bloodPressure.diastolic)
          },
          cholesterol: {
            hdl: Number(result.cholesterol.hdl),
            ldl: Number(result.cholesterol.ldl),
            total: Number(result.cholesterol.hdl) + Number(result.cholesterol.ldl)
          }
        }
      })
    });

    const responseData = await res.json();

    if (!res.ok) {
      throw new Error(responseData.message || 'Failed to retrive Data');
    }

    return responseData;
  } catch (err: unknown) {
    _connectionRefused((err as Error)?.message);
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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
} 

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
    _connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}