import React, { useEffect } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';

import { getAllUser, getItemFromCookies } from '../../utils/apiCall';
import { ErrorView, LoadingModal } from '../../components';
import { useUser } from '../../context';
import type { UserProfile } from '../../Types';

import AddPatient from './addPatient';

const capitalize = (text: string): string =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

const getDob = (dob: string) => {
  return new Date(dob).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

const getAllPatience = async (
  setPatients: React.Dispatch<React.SetStateAction<UserProfile[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModal: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  setError('')
  setModal("LOADING_MODAL")
  try {
    const response = await getAllUser();
    console.log(response)
    setPatients(response.user);
  } catch (error) {
    setError((error as Error)?.message)
  } finally{
    setModal('')
  }
};

const _onAddPatientClick = (setModal: React.Dispatch<React.SetStateAction<string>>) => (): void => {
  setModal('ADD_PATIENT_MODAL')
}

const _onSuccessAddUser = (
  setPatients: React.Dispatch<React.SetStateAction<UserProfile[]>>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
  setModal: React.Dispatch<React.SetStateAction<string>>
) => (): void => {
  getAllPatience(setPatients, setError, setModal)
  setModal('')
}

const _onCloseModalFn = (setModal: React.Dispatch<React.SetStateAction<string>>) => (): void => {
  setModal('')
}

const ListPatients = () => {
  const { setUser } = useUser()
  const { cookieUserId } = getItemFromCookies()
  const navigate: NavigateFunction = useNavigate()
  const [patients, setPatients] = React.useState<UserProfile[]>([])
  const [error, setError] = React.useState<string | null>('')
  const [modal, setModal] = React.useState<string>('')

  useEffect(() => {
    getAllPatience(setPatients, setError, setModal)
  }, [])

  const _renderEmptyState = () => {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-12rem)]">
        <div className="flex flex-col sm:flex-row justify-between items-center rounded-lg gap-4 mb-6">
          <p className="text-sm sm:text-base text-gray-700 font-medium text-center sm:text-left">
            No patient data available. Please click the <span className="font-semibold text-blue-500">"Add New Patient"</span> button to create a new entry.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-8 py-6 max-w-screen-xl mx-auto">
      <div className="flex flex-wrap w-full justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Patient List</h1>
        <button 
          onClick={_onAddPatientClick(setModal)}
          className="cursor-pointer font-semibold bg-blue-500 hover:bg-blue-600 text-white text-sm sm:text-base py-1.5 px-3 sm:py-2 sm:px-4  lg:text-lg rounded-lg shadow-sm transition"
        >
          Add New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {patients.length > 0 && patients.map((patient) => (
          <div
            key={patient._id}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-lg font-semibold text-gray-700">{`${capitalize(patient.firstName)} ${capitalize(patient.lastName)}`}</h2>
            <p className="text-sm text-gray-500">Email: {patient.email}</p>
            <p className="text-sm text-gray-500">Date of Birth: {getDob(patient.dob as string)}</p>
            <p className="text-sm text-gray-500">Phone Number: {patient.phone}</p>

            <button
              className="cursor-pointer mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-medium transition"
              onClick={() => {
                setUser(patient)
                sessionStorage.setItem('patientid', patient._id || '')
                navigate(`/dashboard/${cookieUserId}/${patient._id}`)
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      
      <AddPatient
        isOpen={modal === "ADD_PATIENT_MODAL"}
        onSuccess={_onSuccessAddUser(setPatients, setError, setModal)}
        onCloseFn={_onCloseModalFn(setModal)}
      />
      {patients.length === 0 && _renderEmptyState()}
      <LoadingModal isOpen={modal === "LOADING_MODAL"} message="Getting Patient Data..." />
      {error && <ErrorView error={error} />}
    </div>
  );
};

export default ListPatients;
