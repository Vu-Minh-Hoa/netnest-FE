import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from '../pages/index';
import LoginPage from '../pages/login/login';
import { BASE_URL, LOGIN_LINK, REGISTER_LINK } from '../links/link';
import PrivateRoute from './PrivateRoute';
import RegisterPage from '../pages/register/register';

const AppRoute = () => {
  return (
    <Routes>
      <Route path={LOGIN_LINK} element={<LoginPage />} />
      <Route path={REGISTER_LINK} element={<RegisterPage />} />
      <Route
        path='*'
        element={
          <PrivateRoute>
            <Routes>
              <Route path='*' element={<Navigate to={BASE_URL} />} />
              <Route path={BASE_URL} element={<IndexPage />} />
            </Routes>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
