import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import cn from 'classnames';
import { useAction } from '../../../hooks/useAction';
import { post } from '../../../services/request';
import { API_LIST, API_STATUS } from '../../../contants/common';
import { useSelector } from 'react-redux';
import { useFollow } from '../../../hooks/useFollow';
import { useRouter } from '../../../hooks/useRouter';

const SuggestionList = ({ listItem = {} }) => {
  return (
    <div className='list-item'>
      {listItem?.map((item, index) => (
        <SuggestionItem
          key={index}
          userId={item.userId}
          img={item?.base64Image}
          followStatus={item?.statusFollow}
          username={item?.userName}
          fullname={item?.fullName}
        />
      ))}
    </div>
  );
};

const SuggestionItem = ({ userId, img, username, fullname, followStatus }) => {
  const [isFollowed, setIsFollowed] = useState(false);
  const [isLoading, setIsLoading] = useState('');
  const { delUnfollow, addFollow } = useFollow();
  const { pushRoute } = useRouter();

  useEffect(() => {
    setIsFollowed(followStatus);
  }, [followStatus]);

  const handleFollow = async () => {
    if (isLoading) return;
    setIsLoading(true);
    if (!isFollowed) {
      await addFollow(username);
      setIsFollowed(true);
    } else {
      await delUnfollow(userId);
      setIsFollowed(false);
    }
    setIsLoading(false);
  };

  const handleRedirectToProfile = () => {
    pushRoute(`/profile/${username}`);
  };

  return (
    <div className='item' key={userId}>
      <div className='info-item' onClick={() => handleRedirectToProfile()}>
        <img src={`data:image/png;base64, ${img}`} alt='' />
        <div className='group-info'>
          <span className='username'>{username}</span>
          <h4>{fullname}</h4>
        </div>
      </div>
      <button
        onClick={() => handleFollow()}
        className={cn(
          { 'btn-follow': !isFollowed },
          { 'btn-followed': isFollowed },
        )}
      >
        {isLoading ? '...loading' : isFollowed ? 'Following' : 'Follow'}
      </button>
    </div>
  );
};

export default SuggestionList;
