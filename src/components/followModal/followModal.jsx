import { useEffect, useState } from 'react';
import { CircularProgress } from 'react-cssfx-loading';
import { useSelector } from 'react-redux';
import { API_LIST, FOLLOW } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { useRouter } from '../../hooks/useRouter';
import { deleteMethod, get, post } from '../../services/request';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import { SearchUser } from '../search/search';
import './followModal.scss';

const FollowModal = ({
  followState,
  onClose,
  onClickFollowStateBtn,
  userId = 0,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pushRoute } = useRouter();
  const [isGetFollowDataLoading, setIsGetFollowDataLoading] = useState(false);
  const [followingData, setFollowingData] = useState([]);
  const [followersData, setFollowersData] = useState([]);
  const { action, actionAll } = useAction();
  const { token } = useSelector((store) => store.user);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [followState]);

  const getData = async () => {
    setIsGetFollowDataLoading(true);
    await actionAll([getFollowingData(), getFollowedData()]);
    setIsGetFollowDataLoading(false);
  };

  const getFollowingData = async () => {
    if (userId) {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_following_user,
            config: {
              headers: { authorization: 'Bearer ' + token },
              params: { userId },
            },
          }),
        onSuccess: async (data) => {
          console.log(data);
          setFollowingData(data);
        },
      });
    } else {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_following,
            config: {
              headers: { authorization: 'Bearer ' + token },
            },
          }),
        onSuccess: async (data) => {
          setFollowingData(data);
        },
      });
    }
  };

  const getFollowedData = async () => {
    if (userId) {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_followers_user,
            config: {
              headers: { authorization: 'Bearer ' + token },
              params: { userId },
            },
          }),
        onSuccess: async (data) => {
          console.log(data);
          setFollowersData(data);
        },
      });
    } else {
      await action({
        action: async () =>
          await get({
            url: API_LIST.get_followers,
            config: {
              headers: { authorization: 'Bearer ' + token },
            },
          }),
        onSuccess: async (data) => {
          setFollowersData(data);
        },
      });
    }
  };

  const defUnfollow = async (userId) => {
    await action({
      action: async () =>
        await deleteMethod({
          url: API_LIST.del_unfollow,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userId: userId },
          },
        }),
      onSuccess: async (data) => {},
    });
  };

  const handleFollow = async (userName) => {
    await action({
      action: async () =>
        await post({
          url: API_LIST.post_add_following,
          config: {
            headers: { authorization: 'Bearer ' + token },
            params: { userName: userName },
          },
        }),
      onSuccess: async (data) => {},
    });
  };

  const handleClickFollowUser = (username) => {
    handleCloseModal();
    pushRoute(`/profile/${username}`);
  };

  const handleClickFollowOrUnFollow = async (userId, userName, isFollowed) => {
    if (isFollowed) {
      await defUnfollow(userId);
    } else {
      await handleFollow(userName);
    }
    await getData();
    handleOnClickFollowStateBtn();
  };

  const handleCloseModal = () => {
    onClose && onClose();
  };

  const handleOnClickFollowStateBtn = () => {
    onClickFollowStateBtn && onClickFollowStateBtn();
  };

  return (
    <ModalWrapper onClose={handleCloseModal}>
      <div className='follow-modal'>
        <div className='follow-modal__title'>
          {followState === FOLLOW.FOLLOWING ? 'Following' : 'Follower'}
        </div>
        {/* <div className='follow-modal__search'>
          <MagnifyGlassSvg />
          <input
            className='follow-modal__search-input'
            type='text'
            placeholder='Search'
          />
        </div> */}
        <div className='follow-modal__list'>
          {isGetFollowDataLoading ? (
            <div className='follow-modal__list__loading'>
              <CircularProgress />
            </div>
          ) : followState === FOLLOW.FOLLOWING ? (
            followingData?.length > 0 && (
              <>
                {followingData.map((followingUserInfo, index) => {
                  return (
                    <div
                      key={index}
                      className='follow-modal__list__item-container'
                    >
                      <SearchUser
                        onClickUserInfo={handleClickFollowUser}
                        className='follow-modal__list__item'
                        fullname={followingUserInfo.fullName}
                        userImg={followingUserInfo.base64Image}
                        username={followingUserInfo.userName}
                        userId={followingUserInfo.userId}
                        onClickFollow={handleClickFollowOrUnFollow}
                        isFollowed={true}
                        hasFollowBtn={true}
                        isLoading={isLoading}
                      />
                    </div>
                  );
                })}
              </>
            )
          ) : (
            followersData?.length > 0 && (
              <>
                {followersData?.map((followersUserInfo, index) => {
                  const userFollowState = !!followingData.find(
                    (followingUserInfo) =>
                      followingUserInfo.userId === followersUserInfo.userId,
                  );

                  return (
                    <div
                      key={index}
                      className='follow-modal__list__item-container'
                    >
                      <SearchUser
                        onClickUserInfo={handleClickFollowUser}
                        className='follow-modal__list__item'
                        fullname={followersUserInfo.fullName}
                        userImg={followersUserInfo.base64Image}
                        username={followersUserInfo.userName}
                        userId={followersUserInfo.userId}
                        onClickFollow={handleClickFollowOrUnFollow}
                        hasFollowBtn={true}
                        isFollowed={userFollowState}
                        isLoading={isLoading}
                      />
                    </div>
                  );
                })}
              </>
            )
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default FollowModal;
