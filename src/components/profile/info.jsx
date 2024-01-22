import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { DISPLAY_BASE64, FOLLOW } from '../../contants/common';
import './info.scss';

const Info = ({
  userInfo,
  countPost,
  onChangePassword,
  onEdit,
  onClickFollow,
}) => {
  const { user } = useSelector((store) => store.user);
  const inputRef = useRef();

  const handleClickEditAvatar = () => {
    inputRef.current.click();
  };

  const handleChangePassword = () => {
    onChangePassword && onChangePassword();
  };

  const handleEditProfile = (file) => {
    onEdit && onEdit(file);
  };

  const handleClickFollow = (followState) => {
    onClickFollow && onClickFollow(followState);
  };

  return (
    <div className='profile__container'>
      <div className='profile'>
        <div className='profile-card'>
          <input
            ref={inputRef}
            onChange={(e) => handleEditProfile(e.target.files[0])}
            accept='.png, .jpg, .jpeg, .heic'
            className='profile-card__input-file'
            type='file'
          />
          <div className='profile-picture'>
            <img
              onClick={() => handleClickEditAvatar()}
              src={DISPLAY_BASE64.IMAGE + userInfo.base64Image}
              alt='User Profile'
            />
          </div>
          <div className='user-info'>
            <div className='line'>
              <div className='user-info__username'>{userInfo.userName}</div>
              {user.userId === userInfo.userId && (
                <>
                  <button onClick={() => handleClickEditAvatar()}>
                    Change avatar
                  </button>
                  <button onClick={() => handleChangePassword()}>
                    Change password
                  </button>
                </>
              )}
            </div>
            <div className='line2'>
              <p>
                <b>{countPost}</b> posts
              </p>
              <p
                style={{
                  cursor: `${userInfo.countfollowers ? 'pointer' : ''}`,
                }}
                onClick={() =>
                  userInfo.countfollowers && handleClickFollow(FOLLOW.FOLLOWER)
                }
              >
                <b>{userInfo.countfollowers}</b> followers
              </p>
              <p
                style={{
                  cursor: `${userInfo.countfollowing ? 'pointer' : ''}`,
                }}
                onClick={() =>
                  userInfo.countfollowing && handleClickFollow(FOLLOW.FOLLOWING)
                }
              >
                <b>{userInfo.countfollowing}</b> following
              </p>
            </div>
            <h2 className='username' style={{ marginTop: '0 0 15px' }}>
              {userInfo.fullName}
            </h2>
            {/* <p>
              Co <b>_hanguyen</b> và 6 người khác theo dõi
            </p> */}
          </div>
        </div>
        <div className='form-tag'></div>
      </div>
    </div>
  );
};

export default Info;
