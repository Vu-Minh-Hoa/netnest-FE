import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Info from '../../components/profile/info';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { get, putFormData } from '../../services/request';
import './style.scss';

import ProfilePostList from '../../components/profilePostList/profilePost';
import ModalLoadingCircle from '../../components/common/loadingCircle/loadingCircle';
import { useLocation, useParams } from 'react-router-dom';
import ModalWrapper from '../../components/common/modalWrapper/modalWrapper';
import EditModal from '../../components/edit/editModal';
import FollowModal from '../../components/followModal/followModal';

const ProfilePage = () => {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPost, setUserPost] = useState({});
  const [isOpenInfoEditModal, setIsOpenInfoEditModal] = useState(false);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [isOpenFollowModal, setIsOpenFollowModal] = useState(false);
  const [followState, setFollowState] = useState(false);
  const [isFollow, setIsFollow] = useState(false);
  const { token } = useSelector((store) => store.user);
  const { action, actionAll } = useAction();

  useEffect(() => {
    if (!token) return;
    if (username) {
      getUserDetail();
      return;
    }
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, username]);

  const getData = async () => {
    setIsLoadingComponent(true);
    await actionAll([getUserDetail(), getUserPost()]);
    setIsLoadingComponent(false);
  };

  const getUserDetail = async () => {
    const urlUsername = username ? `?username=${username}` : '';

    if (urlUsername) {
      setIsLoadingComponent(true);
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_search_detail_user + urlUsername,
            config: {
              headers: { authorization: 'Bearer ' + token },
            },
          }),
        onSuccess: async (data) => {
          await getUserPost(data?.userId);
          setUserInfo(data);
        },
      });
      setIsLoadingComponent(false);
    } else {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_user_detail,
            config: {
              headers: { authorization: 'Bearer ' + token },
            },
          }),
        onSuccess: async (data) => {
          setUserInfo(data);
        },
      });
    }
  };

  const getUserPost = async (userId) => {
    const urlUsername = username ? `?username=${username}` : '';
    if (urlUsername) {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_post_user_profile,
            config: {
              headers: { authorization: 'Bearer ' + token },
              params: { userId },
            },
          }),
        onSuccess: async (data) => {
          setUserPost(data);
        },
      });
    } else {
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
    }
  };

  const updateUserAvatar = async (file) => {
    if (!file) return;
    setIsLoadingComponent(true);
    await action({
      action: async () =>
        await putFormData({
          url: API_LIST.put_update_avatar,
          data: {
            image: file,
          },
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        if (!data?.length) return;

        handleCloseEditModal();
        window.location.reload();
      },
    });
    setIsLoadingComponent(false);
  };

  const handleDeletePostComment = async () => {
    await getUserPost();
  };

  const handleDeletePost = async () => {
    await getData();
  };

  const handleFollowStateData = async () => {
    await getUserDetail();
  };

  const handleEditProfile = async (file) => {
    await updateUserAvatar(file);
  };

  const handleCloseEditModal = () => {
    setIsOpenInfoEditModal(false);
  };

  const handleChangePassword = () => {
    setIsOpenInfoEditModal(true);
  };

  const handleOpenFollowModal = (followState) => {
    setFollowState(followState);
    setIsOpenFollowModal(true);
  };

  const handleCloseFollowModal = () => {
    setIsOpenFollowModal(false);
  };

  return (
    <>
      {isOpenInfoEditModal && (
        <EditModal userInfo={userInfo} onClose={handleCloseEditModal} />
      )}
      {(userInfo.countFollowers !== 0 || userInfo.countFollowing) &&
        isOpenFollowModal && (
          <FollowModal
            onClickFollowStateBtn={handleFollowStateData}
            onClose={handleCloseFollowModal}
            followState={followState}
            userId={userInfo?.userId}
          />
        )}
      {isLoadingComponent ? (
        <ModalLoadingCircle />
      ) : (
        <>
          <Info
            userInfo={userInfo}
            countPost={userPost.length}
            onClickFollow={handleOpenFollowModal}
            onChangePassword={handleChangePassword}
            onEdit={handleEditProfile}
          />
          <ProfilePostList
            postData={userPost}
            onDeletePost={handleDeletePost}
            onDeleteComment={handleDeletePostComment}
          />
        </>
      )}
    </>
  );
};

export default ProfilePage;
