import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { API_LIST } from '../../../contants/common';
import { useAction } from '../../../hooks/useAction';
import { CHAT_LINK, HOME_LINK, PROFILE_LINK } from '../../../links/link';
import ChatPage from '../../../pages/chat/chat';
import HomePage from '../../../pages/home/home';
import ProfilePage from '../../../pages/profile/profile';
import { get } from '../../../services/request';
import { setUserDetail } from '../../../slice/userSlice';
import NavBar from '../../navbar/navBar';
import './dashBoardLayout.scss';

const DashBoardLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();
  const [isNavBarSmall, setIsNavBarSmall] = useState(false);

  useEffect(() => {
    if (!token) return;
    getUserDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getUserDetail = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.get_user_detail,
          config: { headers: { authorization: 'Bearer ' + token } },
        }),
      onSuccess: async (data) => {
        dispatch(setUserDetail(data));
      },
    });
  };

  const handleNavBarState = (isSmall = false) => {
    setIsNavBarSmall(isSmall);
  };

  return (
    <div className='layout'>
      <NavBar onResizeNavBar={handleNavBarState} />
      <div
        className={classNames('main-content', {
          'small-nav': isNavBarSmall,
        })}
      >
        <Routes>
          <Route path={HOME_LINK} element={<HomePage />} />
          <Route path={`${PROFILE_LINK}/:username`} element={<ProfilePage />} />
          <Route path={PROFILE_LINK} element={<ProfilePage />} />
          <Route path={CHAT_LINK} element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoardLayout;
