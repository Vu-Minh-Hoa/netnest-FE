import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Info from '../../components/profile/info';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { get } from '../../services/request';
import './style.scss';

import ProfilePostList from '../../components/profilePostList/profilePost';
import ModalLoadingCircle from '../../components/common/loadingCircle/loadingCircle';
import { useLocation, useParams } from 'react-router-dom';

const ProfilePage = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPost, setUserPost] = useState({});
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const { token } = useSelector((store) => store.user);
  const { action, actionAll } = useAction();

  useEffect(() => {
    if (!token) return;
    if (username) return;
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (!username) return;
    handleUserDetail(username);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const getData = async () => {
    setIsLoadingComponent(true);
    await actionAll([getUserDetail(), getUserPost()]);
    setIsLoadingComponent(false);
  };

  const getUserDetail = async (username = '') => {
    const urlUsername = username ? `?username=${username}` : '';

    await action({
      action: async () =>
        await get({
          url: API_LIST.get_user_detail + urlUsername,
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        setUserInfo(data);
      },
    });
  };

  const handleUserDetail = async (username) => {
    await getUserDetail(username);
  };

  const getUserPost = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.get_post_profile,
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        setUserPost(data);
      },
    });
  };

  return (
    <>
      {isLoadingComponent ? (
        <ModalLoadingCircle />
      ) : (
        <>
          <Info userInfo={userInfo} countPost={userPost.length} />
          <ProfilePostList postData={userPost} />
        </>
      )}
    </>
  );
};

export default ProfilePage;
