import React, { useEffect, useState } from 'react';
import { FOLLOWED_LIST, POST_LIST, SUGGESTION_LIST } from '../../contants/mock';
import SuggestionList from '../../components/suggestion/suggestionList/SuggestionList';
import './home.scss';
import FollowedList from '../../components/followed/followed';
import PostList from '../../components/postList/postList';
import { useAction } from '../../hooks/useAction';
import { API_LIST } from '../../contants/common';
import { get } from '../../services/request';
import { useDispatch, useSelector } from 'react-redux';
import userSlice, { setUserDetail } from '../../slice/userSlice';
import ModalLoadingCircle from '../../components/common/loadingCircle/loadingCircle';

const HomePage = () => {
  const { action, actionAll } = useAction();
  const [postData, setPostData] = useState([]);
  const [isLoadingComponent, setIsLoadingComponent] = useState(false);
  const [followerData, setFollowerData] = useState([]);
  const [followingData, setFollowingData] = useState([]);
  const [suggestFriend, setSuggestFriend] = useState([]);
  const { token } = useSelector((store) => store.user);

  useEffect(() => {
    if (!token) return;
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getData = async () => {
    setIsLoadingComponent(true);
    await actionAll([
      getPost(),
      getFollower(),
      getFollowing(),
      getSuggestFriend(),
    ]);
    setIsLoadingComponent(false);
  };

  const getPost = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.home,
          isLoading: false,
          config: { headers: { authorization: 'Bearer ' + token } },
        }),
      onSuccess: async (data) => {
        setPostData(data);
      },
    });
  };

  const getSuggestFriend = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.suggest_friend,
          isLoading: false,
          config: { headers: { authorization: 'Bearer ' + token } },
        }),
      onSuccess: async (data) => {
        setSuggestFriend(data);
      },
    });
  };

  const getFollower = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.get_followers,
          isLoading: false,
          config: { headers: { authorization: 'Bearer ' + token } },
        }),
      onSuccess: async (data) => {
        setFollowerData(data);
      },
    });
  };

  const getFollowing = async () => {
    await action({
      action: async () =>
        await get({
          url: API_LIST.get_following,
          isLoading: false,
          config: { headers: { authorization: 'Bearer ' + token } },
        }),
      onSuccess: async (data) => {
        setFollowingData(data);
      },
    });
  };
  if (isLoadingComponent) {
    return <ModalLoadingCircle />;
  } else if (!followingData.length) {
    return (
      <div className='homePage-suggestion'>
        <div className='homePage-suggestion-content'>
          <span>Suggested for you</span>
          <SuggestionList listItem={suggestFriend} />
        </div>
      </div>
    );
  } else {
    return (
      <div className='homePage-suggestion'>
        <div className='homePage-suggestion__content'>
          <FollowedList listUser={followingData || []} />
          <PostList postList={postData || []} />
        </div>
        {suggestFriend?.length > 0 && (
          <div className='homePage-guggestion__follow'>
            <span>Suggested for you</span>
            <SuggestionList listItem={suggestFriend} />
          </div>
        )}
      </div>
    );
  }
};

export default HomePage;
