import { useFormik, type FormikHelpers, type FormikProps } from "formik";
import { useState } from 'react';
import { toast } from "sonner";

import { DateInput, InputField, LoadingModal, Modal } from "../../../shared";
import { addNewUser, addDataUserValidationSchema } from '../listPatiens.utils';

import type { AddPatientProps, FormikPropsData } from '../listPatient.types'

const _addDataUser = (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  onSuccess?: () => void
) => async (values: FormikPropsData, formik: FormikHelpers<FormikPropsData>) => {
  setLoading(true)
  try {
    await addNewUser(values)
    onSuccess?.()
    toast.success('User added successfully')
    formik.resetForm()
  } catch (error: unknown) {
    toast.error((error as Error)?.message || 'Failed to add user, please try again.')
  } finally {
    setLoading(false)
  }
}

const _renderDropdown = (formik: FormikProps<FormikPropsData>): React.ReactElement => {
  return (
    <div className="w-full">
      <label htmlFor="gender" className="block mb-1 text-sm font-medium text-gray-700">
        Gender
      </label>
      <select
        id="gender"
        name="gender"
        value={formik.values.gender}
        onChange={(e) => formik.setFieldValue('gender', e.target.value)}
        className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none text-black"
      >
        <option value="" disabled>Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      {formik.errors.gender && (
        <p className="text-sm text-red-500 mt-1">{formik.errors.gender}</p>
      )}
    </div>
  );
};


const AddPatient = ({ isOpen, onCloseFn, onSuccess }: AddPatientProps): React.ReactElement => {
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    validationSchema: addDataUserValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      firstName: '',
      lastName: '',
      dob: new Date(),
      phone: '',
      email: '',
      gender: ''
    },
    onSubmit: _addDataUser(setLoading, onSuccess)
  })

  const _onCloseFn = () => {
    onCloseFn()
    formik.resetForm()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={_onCloseFn}
      title="Add New Patient"
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* First & Last Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="firstName"
            label="First Name"
            placeholder="First Name"
            type="text"
            value={formik.values.firstName}
            onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
            errorText={formik.errors.firstName as string}
          />
          <InputField
            id="lastName"
            label="Last Name"
            placeholder="Last Name"
            type="text"
            value={formik.values.lastName}
            onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
            errorText={formik.errors.lastName as string}
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="email"
            label="E-Mail"
            placeholder="E-Mail"
            type="email"
            value={formik.values.email}
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            errorText={formik.errors.email as string}
          />
          <InputField
            id="phone"
            label="Phone"
            placeholder="Phone"
            type="tel"
            value={formik.values.phone}
            onChange={(e) => formik.setFieldValue('phone', e.target.value)}
            errorText={formik.errors.phone as string}
          />
        </div>

        {/* DOB & Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DateInput
            id="dob"
            label="Date of Birth"
            selectedDate={formik.values.dob}
            onChange={(e) => formik.setFieldValue('dob', e)}
            dateFormat="dd MMM yyyy"
            errorText={formik.errors.dob as string}
          />
          {_renderDropdown(formik)}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
          >
            Submit
          </button>
        </div>
      </form>
      {loading && <LoadingModal isOpen={loading} message="Loading Data..." />}
    </Modal>
  )
}

export default AddPatient
