import { useFormik, type FormikHelpers, type FormikProps } from 'formik';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate, type NavigateFunction } from 'react-router-dom';
import { toast } from 'sonner';

import { InputField, LoadingModal, Logo } from '../../shared';
import { cookiesSetting } from '../../shared/utils'
import { signInValidationSchema, signInApiCall } from './signIn.utils';

import type { SignInFormik } from './signin.types'

const _renderRightPanel = (isLoading: boolean): React.ReactElement => (
  <>
    <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-blue-500 text-white w-1/2 p-10 relative">
      <h3 className="text-3xl font-bold mb-4">New To MEDICare?</h3>
      <p className="text-center mb-6 max-w-xs">
        Sign up and discover a great amount of new opportunities!
      </p>
      <a
        href="/sign-up"
        className="bg-white text-teal-600 px-6 py-2 rounded-full font-semibold shadow hover:bg-gray-100 transition"
      >
        Sign Up
      </a>
    </div>
    <LoadingModal isOpen={isLoading} message="Signing in..." />
  </>
);

const _renderLeftPanel = (formik: FormikProps<SignInFormik>) => (
  <div className="flex-1 flex items-center justify-center bg-white p-8">
    <div className="w-full max-w-md">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Login to Your Account</h2>
        <p className="text-sm text-gray-500 mt-2">Sign in using your email and password</p>
      </div>

      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <InputField
          id="email"
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => formik.setFieldValue('email', e.target.value)}
          errorText={formik.errors.email}
          value={formik.values.email}
        />
        <InputField
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => formik.setFieldValue('password', e.target.value)}
          errorText={formik.errors.password}
          value={formik.values.password}
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition duration-300"
        >
          Sign In
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don't have an account?{' '}
        <a href="/sign-up" className="text-teal-700 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  </div>
)

const _signIn = (
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction
) => async (values: SignInFormik, formikHelpers: FormikHelpers<SignInFormik>): Promise<void> => {
  setIsLoading(true);

  try {
    const res = await signInApiCall(values.email, values.password);
    if (res.token) {
      toast.success('Signed in successfully');

      Cookies.set('accessToken', res.token?.accessToken, cookiesSetting());

      Cookies.set('userId', JSON.stringify(res.user?.id), cookiesSetting());

      Cookies.set('apiKey', res.token?.apiKey, cookiesSetting());

      formikHelpers.resetForm();
      navigate(`/list-patients/${res.user?.id}`, { replace: true });
    }
  } catch (err: unknown) {
    toast.error((err as Error)?.message || 'Sign in failed');
  } finally {
    setIsLoading(false);
  }
};

const SignInPage = (): React.ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    validationSchema: signInValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: _signIn(setIsLoading, navigate)
  });

  return (
    <div className="relative flex min-h-screen w-dvw">
      <div className="absolute top-6 left-6 text-2xl font-bold">
        <Logo navigatePath='/' />
      </div>
      {_renderLeftPanel(formik)}
      {_renderRightPanel(isLoading)}
    </div>
  );
};

export default SignInPage;
