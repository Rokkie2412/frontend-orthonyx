import { useFormik, type FormikHelpers, type FormikProps } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';

import { DateInput, InputField, LoadingModal, Logo } from '../../components/index.ts';
import { signUpApiCall } from '../../utils/apiCall.ts';
import { validationSchema } from '../../utils/general.ts';
import type { FormikSignUp } from './signup.type.ts';

const _renderLeftPanel = () => {
  return (
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-teal-500 text-white w-1/2 p-10 relative">
      <h3 className="text-3xl font-bold mb-4">Welcome Back!</h3>
      <p className="text-center mb-6 max-w-xs">Already have an account? Sign in and continue your healthcare journey.</p>
      <a
        href="/sign-in"
        className="bg-white text-teal-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
      >
        Sign In
      </a>
    </div>
  )
}

const _renderRightPanel = (formik: FormikProps<FormikSignUp>) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-white p-8">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
          <p className="text-sm text-gray-500 mt-2">Fill the form to get started</p>
        </div>

        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="flex justify-between space-x-2">
            <div className="w-1/2">
              <InputField
                id="firstName"
                label="First Name"
                placeholder="First Name"
                onChange={(e) => formik.setFieldValue('firstName', e.target.value)}
                errorText={formik.errors.firstName}
                value={formik.values.firstName}
              />
            </div>
            <div className="w-1/2">
              <InputField
                id="lastName"
                label="Last Name"
                placeholder="Last Name"
                onChange={(e) => formik.setFieldValue('lastName', e.target.value)}
                errorText={formik.errors.lastName}
                value={formik.values.lastName}
              />
            </div>
          </div>

          <div className='flex justify-between space-x-2'>
            <DateInput
              id='dob'
              label='Date of Birth'
              onChange={(e) => formik.setFieldValue('dob', e)}
              errorText={formik.errors.dob as string}
              selectedDate={formik.values.dob}
              placeholder='Date of Birth'
              dateFormat='dd MMM yyyy'
            />
            <InputField
              id="phoneNumber"
              label="Phone Number"
              placeholder="Phone Number"
              onChange={(e) => formik.setFieldValue('phone', e.target.value)}
              errorText={formik.errors.phone}
              value={formik.values.phone}
              type='tel'
            />
          </div>

          <InputField
            id="email"
            label="Email"
            placeholder="Email"
            onChange={(e) => formik.setFieldValue('email', e.target.value)}
            errorText={formik.errors.email}
            value={formik.values.email}
          />
          <InputField
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
            onChange={(e) => formik.setFieldValue('password', e.target.value)}
            errorText={formik.errors.password}
            value={formik.values.password}
          />

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition duration-300"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{' '}
          <a href="/sign-in" className="text-teal-700 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  )
}

const signUp = async (
  values: FormikSignUp,
  formikHelpers: FormikHelpers<FormikSignUp>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => {
  setIsLoading(true);
  try {
    const res = await signUpApiCall(values);
    if (res.token && res.user?.id) {
      toast.success("Account created successfully");

      Cookies.set('accessToken', res.token?.accessToken, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      });

      Cookies.set('userId', JSON.stringify(res.user?.id), {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      });

      Cookies.set('apiKey', res.token?.apiKey, {
        secure: true,
        sameSite: 'Strict',
        expires: 1,
      });

      formikHelpers.resetForm();
      navigate(`/list-patients/${res.user.id}`, { replace: true });
    }

  } catch (err: unknown) {
    toast.error((err as Error)?.message || 'Registration failed');
  } finally {
    setIsLoading(false);
  }
};

const SignUpPage = () => {
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik<FormikSignUp>({
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dob: new Date(),
      phone: ''
    },
    onSubmit: (values, formikHelpers) => signUp(values, formikHelpers, setIsLoading, navigate),
  });

  return (
    <div className="relative flex min-h-screen w-dvw">
      <div className="absolute top-6 right-6 text-3xl font-extrabold tracking-tight flex items-center space-x-1">
        <Logo navigatePath='/list-patients' />
      </div>
      {_renderLeftPanel()}
      {_renderRightPanel(formik)}
      <LoadingModal isOpen={isLoading} message="Registering..." />
    </div>
  );
};

export default SignUpPage;
