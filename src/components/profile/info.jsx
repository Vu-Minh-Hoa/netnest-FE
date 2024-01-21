import { useRef } from 'react';
import { DISPLAY_BASE64 } from '../../contants/common';
import './info.scss';

const Info = ({ userInfo, countPost, onChangePassword, onEdit }) => {
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

  return (
    <div className='profile__container'>
      <div className='profile'>
        <div className='profile-card'>
          <input
            ref={inputRef}
            onChange={(e) => handleEditProfile(e.target.files[0])}
            accept='.png, .jpg, .jpeg'
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
              <button onClick={() => handleClickEditAvatar()}>
                Change avatar
              </button>
              <button onClick={() => handleChangePassword()}>
                Change password
              </button>
            </div>
            <div className='line2'>
              <p>
                <b>{countPost}</b> posts
              </p>
              <p>
                <b>{userInfo.countfollowers}</b> followers
              </p>
              <p>
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
