import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashBoardLayout from '../components/layouts/dashboardLayout/dashBoardLayout';
import { LOGIN_LINK, REGISTER_LINK } from '../links/link';
import LoginPage from '../pages/login/login';
import RegisterPage from '../pages/register/register';
import PrivateRoute from './PrivateRoute';

const AppRoute = () => {
  return (
    <Routes>
      <Route path={LOGIN_LINK} element={<LoginPage />} />
      <Route path={REGISTER_LINK} element={<RegisterPage />} />
      <Route
        path='/*'
        element={
          <PrivateRoute>
            <DashBoardLayout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoute;
