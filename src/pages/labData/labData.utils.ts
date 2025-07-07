import * as yup from 'yup'
import { format } from 'date-fns';
import Papa from 'papaparse';

import { connectionRefused, getItemFromCookies } from '../../shared/utils';
import type { AddLabDataTypes } from '../listPatiens/listPatient.types';
import type { LabData } from '../../shared/types';
import type { LabDataResponse } from '../dashboard/dashboard.types';

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
    connectionRefused((err as Error)?.message);
    throw new Error((err as Error)?.message || 'Something Went Wrong Please Refresh The Page');
  }
}

export const handleDownloadCSV = (labData: LabData[]) => () => {
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