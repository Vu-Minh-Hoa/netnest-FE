import { Route, Routes } from 'react-router-dom';
import { CHAT_LINK, HOME_LINK, PROFILE_LINK } from '../../../links/link';
import ProfilePage from '../../../pages/profile';
import NavBar from '../../navbar/navBar';
import './dashBoardLayout.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useAction } from '../../../hooks/useAction';
import { API_LIST } from '../../../contants/common';
import { setUserDetail } from '../../../slice/userSlice';
import { get } from '../../../services/request';
import { useEffect } from 'react';
import ChatPage from '../../../pages/chat/chat';
import HomePage from '../../../pages/home/home';

const DashBoardLayout = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.user);
  const { action } = useAction();

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

  return (
    <div className='layout'>
      <NavBar />
      <div className='main-content'>
        <Routes>
          <Route path={HOME_LINK} element={<HomePage />} />
          <Route path={PROFILE_LINK} element={<ProfilePage />} />
          <Route path={CHAT_LINK} element={<ChatPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoardLayout;
