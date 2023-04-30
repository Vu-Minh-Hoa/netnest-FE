import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from '../pages/index';
import LoginPage from '../pages/login/login';
import { BASE_URL, LOGIN_LINK } from '../links/link';

const AppRoute = () => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to={BASE_URL} />} />
      <Route path={BASE_URL} element={<IndexPage />} />
      <Route path={LOGIN_LINK} element={<LoginPage />} />
    </Routes>
  );
};

export default AppRoute;
