import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import IndexPage from '../pages/index';
import LoginPage from '../pages/login/login';
import SuggestionPage from '../pages/suggestions';
import LayoutMain from '../components/layouts/LayoutMain';
import ProfilePage from '../pages/profile';
import { BASE_URL, LOGIN_LINK,SUGGESTION_LINK,PROFILE_LINK } from '../links/link';

const AppRoute = () => {
  return (
    <Routes>
      <Route path='*' element={<Navigate to={BASE_URL} />} />
      <Route path={BASE_URL} element={<IndexPage />} />
      <Route path={LOGIN_LINK} element={<LoginPage />} />
      <Route path={SUGGESTION_LINK} element={<LayoutMain><SuggestionPage /></LayoutMain>} />
      <Route path={`${PROFILE_LINK}/:id`} element={<LayoutMain><ProfilePage /></LayoutMain>} />
    </Routes>
  );
};

export default AppRoute;
