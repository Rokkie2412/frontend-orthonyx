import Cookies from 'js-cookie';
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';

import type { ProtectedRouteProps } from './protectedRoute.types';

const ProtectedRouteUser = ({ children }: ProtectedRouteProps): React.ReactElement => {
  const { userid } = useParams<{ userid: string }>();

  const cookieUserId = Cookies.get('userId')?.replace(/"/g, '').trim();
  const token = Cookies.get('accessToken');

  const isInvalid =
    !token || !userid || !cookieUserId || cookieUserId !== userid.trim();

  if (isInvalid) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRouteUser
