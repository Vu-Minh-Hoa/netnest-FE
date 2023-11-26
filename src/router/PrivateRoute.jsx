import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { accountTokenSelector } from '../../state/account';

const PrivateRoute = ({ children }) => {
  const auth = useSelector(accountTokenSelector);
  return auth != null ? children : <Navigate to='/login' />;
};

export default PrivateRoute;
