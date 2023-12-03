import { Route, Routes } from 'react-router-dom';
import { HOME_LINK, PROFILE_LINK, SUGGESTION_LINK } from '../../../links/link';
import ProfilePage from '../../../pages/profile';
import SuggestionPage from '../../../pages/suggestions';
import NavBar from '../../navbar/navBar';
import MainLayout from '../LayoutMain';
import './dashBoardLayout.scss';
import IndexPage from '../../../pages/index';

const DashBoardLayout = () => {
  return (
    <div className='layout'>
      <NavBar />
      <div className='main-content'>
        <Routes>
          <Route path={HOME_LINK} element={<IndexPage />} />
          <Route
            path={SUGGESTION_LINK}
            element={
              <MainLayout>
                <SuggestionPage />
              </MainLayout>
            }
          />
          <Route
            path={`${PROFILE_LINK}/:id`}
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoardLayout;
