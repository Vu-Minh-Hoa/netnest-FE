import { useState } from 'react';
import { CircularProgress } from 'react-cssfx-loading';
import { useSelector } from 'react-redux';
import CloseSvg from '../../assets/svg/closeSvg';
import { API_LIST, USER_CHAT_ACTION } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { get, post } from '../../services/request';
import Button from '../common/button/button';
import ModalWrapper from '../common/modalWrapper/modalWrapper';
import './chatModal.scss';

const ChatModal = ({
  onClose,
  onCreateChat,
  currentUserAction,
  onLeaveChat,
}) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreateChatLoading, setIsCreateChatLoading] = useState(false);
  const { token } = useSelector((state) => state.user);
  const { action } = useAction();

  const handleLeaveChat = () => {
    onLeaveChat && onLeaveChat();
  };

  const handleCloseChatModal = () => {
    onClose && onClose();
  };

  const handleSearchUser = async (value) => {
    if (!value) {
      setSearchedUsers([]);
      return;
    }
    setIsLoading(true);
    await action({
      action: async () =>
        await get({
          url: `${API_LIST.get_search_user}/${value}`,
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        setSearchedUsers(data);
      },
    });
    setIsLoading(false);
  };

  const handleAddUser = (userInfo) => {
    setAddedUsers((prev) => {
      const isExist = prev.find((item) => item.userId === userInfo.userId);

      if (isExist) {
        const newAddedUsers = prev.filter(
          (item) => item.userId !== userInfo.userId,
        );
        return newAddedUsers;
      }

      return [...prev, userInfo];
    });
  };

  const handleCreateChat = async () => {
    setIsCreateChatLoading(true);
    await action({
      action: async () =>
        await post({
          url: `${API_LIST.post_create_chat}`,
          data: addedUsers,
          config: {
            headers: { authorization: 'Bearer ' + token },
          },
        }),
      onSuccess: async (data) => {
        onCreateChat && onCreateChat(data);
      },
    });
    setIsCreateChatLoading(false);
  };

  return (
    <ModalWrapper onClose={() => handleCloseChatModal()}>
      <div className='chat-modal__container'>
        {currentUserAction === USER_CHAT_ACTION.SEARCH_USER_CHAT && (
          <>
            <div className='chat-modal__title'>Chat</div>
            <div className='chat-modal__input'>
              <div className='chat-modal__label'>To: </div>
              <input
                onChange={(e) => handleSearchUser(e.target.value)}
                placeholder='Search...'
                type='text'
              />
            </div>
            <div className='chat-modal__added-name__container'>
              {addedUsers?.length > 0 &&
                addedUsers.map((userInfo, key) => (
                  <div key={key} className='chat-modal__added-name'>
                    <div className='chat-modal__name'>{userInfo.username}</div>
                    <div
                      className='chat-modal__close '
                      onClick={() => handleAddUser(userInfo)}
                    >
                      <CloseSvg />
                    </div>
                  </div>
                ))}
            </div>
            <div className='chat-modal__searched-name'>
              {isLoading ? (
                <div className='chat-modal__search__loading'>
                  <CircularProgress />
                </div>
              ) : searchedUsers?.length > 0 ? (
                <div className='chat-modal__search__result-container'>
                  <div className='chat-modal__search__result'>
                    {searchedUsers?.map((item, key) => {
                      return (
                        <div
                          key={key}
                          className='chat-modal__search__result__list'
                        >
                          <SearchUser
                            addedUsers={addedUsers}
                            userId={item?.userId}
                            userImg={item?.base64Image}
                            username={item?.userName}
                            fullname={item?.fullName}
                            onCheck={handleAddUser}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className='chat-modal__search__result__none'>
                  No account found
                </div>
              )}
            </div>
            <div className='chat-modal__btn-container'>
              <Button
                onClick={() => handleCreateChat()}
                text='Chat'
                isLoading={isCreateChatLoading}
                className='chat-modal__btn'
                isDisabled={!!!addedUsers.length}
              />
            </div>
          </>
        )}
        {currentUserAction === USER_CHAT_ACTION.USER_ACTION && (
          <div className='chat-modal__user-action'>
            <div
              className='chat-modal__user-leave-btn'
              onClick={() => handleLeaveChat()}
            >
              Leave
            </div>
            <div
              className='chat-modal__user-cancel-btn'
              onClick={() => handleCloseChatModal()}
            >
              Cancel
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
};

const SearchUser = ({
  userImg,
  username,
  fullname,
  userId,
  onCheck,
  addedUsers,
}) => {
  const handleCheckBox = (userId, username) => {
    const userInfo = { userId, username };

    onCheck && onCheck(userInfo);
  };

  return (
    <form className='search__user-info-container' action='#'>
      <label className='search__user-info' for={username}>
        <img
          className='search__user-img'
          src={`data:image; base64, ${userImg}`}
          alt=''
        />
        <div className=''>
          <div className='search__user-username'>{username}</div>
          <div className='search__user-fullname'>{fullname}</div>
        </div>
      </label>
      <div className='search__user-checkbox-container'>
        <input
          onChange={() => handleCheckBox(userId, username)}
          className='search__user-checkbox'
          checked={!!addedUsers.find((item) => item.userId === userId)}
          type='checkbox'
          id={username}
        />
      </div>
    </form>
  );
};

export default ChatModal;
