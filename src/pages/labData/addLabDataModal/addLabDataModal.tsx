import { useState } from 'react'
import { useFormik, type FormikHelpers } from 'formik'

import { toast } from 'sonner'
import { DateInput, InputField, Modal, LoadingModal } from '../../../shared'
import { AddLabDataValidationSchema, addNewLabData } from '../labData.utils'

import type { addLabDataModalProps, FormikPropsData } from './addLabDataModal.types'
import { useParams } from 'react-router-dom'

const _handleSubmit = (
  onCloseFn: () => void,
  onSuccess: () => void,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  patientId: string
) => async (values: FormikPropsData, formikHelpers: FormikHelpers<FormikPropsData>) => {
  setIsLoading(true);
  try {
    await addNewLabData({
      date: values.date,
      result: {
        glucose: values.glucose,
        bloodPressure: values.bloodPreasure,
        cholesterol: values.cholesterol
      },
      patientId
    });

    toast.success('Lab data added successfully');
    onCloseFn();
    formikHelpers.resetForm();
    if (onSuccess) {
      onSuccess();
    }
  } catch (error: unknown) {
    toast.error((error as Error)?.message || 'Failed to add lab data');
  } finally{
    setIsLoading(false);
  }
};

const AddLabDataModal = ({ isOpen, onCloseFn, onSuccess }: addLabDataModalProps): React.ReactElement => {
  const params = useParams<{ patientid?: string }>();
  const patientId = params.patientid || sessionStorage.getItem('patientid') || '';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<FormikPropsData>({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      date: new Date(),
      glucose: 0,
      bloodPreasure: {
        systolic: 0,
        diastolic: 0
      },
      cholesterol: {
        hdl: 0,
        ldl: 0
      }
    },
    validationSchema: AddLabDataValidationSchema,
    onSubmit: _handleSubmit(onCloseFn, onSuccess, setIsLoading, patientId)
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCloseFn}
      title='Add Lab Data'
    >
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        {/* Glucose & Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            id="glucose"
            label="Glucose"
            onChange={(e) => formik.setFieldValue('glucose', e.target.value)}
            value={formik.values.glucose ? formik.values.glucose.toString() : ''}
            errorText={formik.errors.glucose as string}
            type="number"
            placeholder="Glucose"
          />
          <DateInput
            label="Date"
            id="date"
            selectedDate={formik.values.date}
            onChange={(e) => formik.setFieldValue('date', e)}
            dateFormat="dd MMM yyyy"
            errorText={formik.errors.date as string}
          />
        </div>

        {/* Blood Pressure */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Blood Pressure</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="systolic"
              label="Systolic"
              onChange={(e) => formik.setFieldValue('bloodPreasure.systolic', e.target.value)}
              value={formik.values.bloodPreasure.systolic ? formik.values.bloodPreasure.systolic.toString() : ''}
              errorText={formik.errors.bloodPreasure?.systolic as string}
              type="number"
              placeholder="Systolic"
            />
            <InputField
              id="diastolic"
              label="Diastolic"
              onChange={(e) => formik.setFieldValue('bloodPreasure.diastolic', e.target.value)}
              value={formik.values.bloodPreasure.diastolic ? formik.values.bloodPreasure.diastolic.toString() : ''}
              errorText={formik.errors.bloodPreasure?.diastolic as string}
              type="number"
              placeholder="Diastolic"
            />
          </div>
        </div>

        {/* Cholesterol */}
        <div>
          <h3 className="text-gray-700 font-semibold mb-2">Cholesterol</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              id="hdl"
              label="HDL"
              onChange={(e) => formik.setFieldValue('cholesterol.hdl', e.target.value)}
              value={formik.values.cholesterol.hdl ? formik.values.cholesterol.hdl.toString() : ''}
              errorText={formik.errors.cholesterol?.hdl as string}
              type="number"
              placeholder="HDL"
            />
            <InputField
              id="ldl"
              label="LDL"
              onChange={(e) => formik.setFieldValue('cholesterol.ldl', e.target.value)}
              value={formik.values.cholesterol.ldl ? formik.values.cholesterol.ldl.toString() : ''}
              errorText={formik.errors.cholesterol?.ldl as string}
              type="number"
              placeholder="LDL"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
      <LoadingModal isOpen={isLoading} message="Adding lab data..." />
    </Modal>
  )
}

export default AddLabDataModal
