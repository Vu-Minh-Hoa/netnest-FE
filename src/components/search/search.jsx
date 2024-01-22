import classNames from 'classnames';
import MagnifyGlassSvg from '../../assets/svg/magnifyGlassSVG';
import './search.scss';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import ModalLoadingCircle from '../common/loadingCircle/loadingCircle';
import { CircularProgress, FadingBalls } from 'react-cssfx-loading';
import { useRouter } from '../../hooks/useRouter';
import { DISPLAY_BASE64 } from '../../contants/common';

const SearchBar = ({
  recentSearchUser,
  searchedUsers,
  isActive,
  onChange,
  onClickViewUserInfo,
  isLoading,
}) => {
  const { pushRoute } = useRouter();

  const handleOnchange = (value) => {
    onChange && onChange(value);
  };

  const handleViewUserInfo = (username) => {
    onClickViewUserInfo && onClickViewUserInfo(username);
    // pushRoute(`/profile/#/?username=${username}`);
  };

  return (
    <div className={classNames('search-container', { active: isActive })}>
      <div className='search__input-header'>
        <div className='search__input-header__title'>Search</div>
        <div className=' search__input-header__input'>
          <MagnifyGlassSvg />
          <input
            onChange={(e) => {
              handleOnchange(e.target.value);
            }}
            type='text'
            placeholder='Search...'
          />
        </div>
      </div>
      {isLoading ? (
        <div className='search__loading'>
          <FadingBalls />
        </div>
      ) : (
        <>
          {searchedUsers.length > 0 && !(recentSearchUser.length > 0) && (
            <div className='search__result-container'>
              <div className='search__result'>
                {searchedUsers.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className='search__result__list'
                      onClick={() => handleViewUserInfo(item.userName)}
                    >
                      <SearchUser
                        userImg={item?.base64Image}
                        username={item?.userName}
                        fullname={item?.fullName}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {recentSearchUser.length > 0 && !(searchedUsers.length > 0) && (
            <div className='search__recent-search'>
              <div className='search__recent-search__title-container'>
                <div className='search__recent-search__title'>Recent</div>
                <div className='search__recent-search__clear'>Clear all</div>
              </div>
              <div className='search__recent-search__list-container'>
                {recentSearchUser.map((item, key) => {
                  return (
                    <div key={key} className='search__recent-search__list'>
                      <SearchUser
                        userImg={item.img}
                        username={item.username}
                        fullname={item.fullname}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const SearchUser = ({
  userImg,
  username,
  fullname,
  userId,
  className = '',
  hasFollowBtn = false,
  isFollowed,
  onClickUserInfo,
  isLoading,
  onClickFollow,
}) => {
  console.log(isFollowed);
  const handleFollow = () => {
    onClickFollow && onClickFollow(userId, username, isFollowed);
  };

  const handleClickUserInfo = () => {
    onClickUserInfo && onClickUserInfo(username);
  };

  return (
    <div className={classNames(className, 'search__user-info')}>
      <div className='search__user-info__content-container'>
        <div
          className='search__user-info__content'
          onClick={() => handleClickUserInfo()}
        >
          <img
            className='search__user-img'
            src={DISPLAY_BASE64.IMAGE + userImg}
            alt=''
          />
          <div className='search__user-info__name'>
            <div className='search__user-username'>{username}</div>
            <div className='search__user-fullname'>{fullname}</div>
          </div>
        </div>
      </div>
      {hasFollowBtn && (
        <button
          onClick={() => handleFollow()}
          className={classNames(
            { 'btn-follow': !isFollowed },
            { 'btn-followed': isFollowed },
            'search__user-info-btn',
          )}
        >
          {isLoading ? '...loading' : isFollowed ? 'Following' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
