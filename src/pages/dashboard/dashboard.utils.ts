import type { LabData } from '../../shared/types';
import { format } from 'date-fns';
import {connectionRefused, getItemFromCookies} from '../../shared/utils'

import type {LabDataResponse, UserProfilesData} from './dashboard.types'

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
    connectionRefused((err as Error)?.message);
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
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}

export const chartData = (data: LabData[]) => data.map(item => ({
  date: format(new Date(item.date), 'd MMM yyyy'),
  glucose: item.results.glucose,
  cholesterol: item.results.cholesterol.total,
  systolic: item.results.bloodPressure.systolic,
  diastolic: item.results.bloodPressure.diastolic,
}));