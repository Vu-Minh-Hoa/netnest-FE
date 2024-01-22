import { useRouter } from '../../hooks/useRouter';
import './followed.scss';

const FollowedList = ({ listUser = [] }) => {
  const { pushRoute } = useRouter();

  const handleClickAvatar = (username) => {
    pushRoute(`/profile/${username}`);
  };

  return (
    <div className='followed-list-container'>
      {listUser.length > 0 &&
        listUser.map((user, key) => {
          return (
            <div
              id={user.userId}
              key={key}
              className='followed-user'
              onClick={() => handleClickAvatar(user?.userName)}
            >
              <div className='followed-user-img__wrapper'>
                <div className='followed-user-img'>
                  <img
                    src={`data:image/png;base64, ${user?.base64Image}`}
                    alt=''
                  />
                </div>
              </div>
              <div className='followed-user-name'>{user.userName}</div>
            </div>
          );
        })}
    </div>
  );
};

export default FollowedList;
