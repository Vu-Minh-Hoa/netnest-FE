import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { accountTokenSelector } from '../state/account';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const PrivateRoute = ({ children }) => {
  const auth = useSelector(accountTokenSelector);
  return auth != null ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
