import './followed.scss';

const FollowedList = ({ listUser }) => {
  return (
    <div className='followed-list-container'>
      {listUser.map((user, key) => {
        return (
          <div key={key} className='followed-user'>
            <div className='followed-user-img__wrapper'>
              <div className='followed-user-img'>
                <img src={user.img} alt='' />
              </div>
            </div>
            <div className='followed-user-name'>{user.name}</div>
          </div>
        );
      })}
    </div>
  );
};

export default FollowedList;
