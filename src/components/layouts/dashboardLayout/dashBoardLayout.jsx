import { Route, Routes } from 'react-router-dom';
import { HOME_LINK, PROFILE_LINK } from '../../../links/link';
import ProfilePage from '../../../pages/profile';
import NavBar from '../../navbar/navBar';
import './dashBoardLayout.scss';
import HomePage from '../../../pages/home/home';

const DashBoardLayout = () => {
  return (
    <div className='layout'>
      <NavBar />
      <div className='main-content'>
        <Routes>
          <Route path={HOME_LINK} element={<HomePage />} />
          <Route path={PROFILE_LINK} element={<ProfilePage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoardLayout;
