import {
  Avatar,
  AvatarGroup,
  ChatContainer,
  Conversation,
  ConversationHeader,
  ConversationList,
  EllipsisButton,
  MainContainer,
  Message,
  MessageGroup,
  MessageInput,
  MessageList,
  Sidebar,
} from '@chatscope/chat-ui-kit-react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import SearchChat from '../../assets/svg/searchChat';
import { CHAT_TYPE, DISPLAY_BASE64 } from '../../contants/common';
import ModalLoadingCircle from '../common/loadingCircle/loadingCircle';
import './MainChat.scss';

export const Chat = ({
  user,
  onSendMessage,
  conversationData,
  conversationUserOther = [],
  onClickConversation,
  chatData,
  messageData,
  onAddNewChat,
  isConversationLoading,
  conversationUserInfo,
  onClickChatAction,
}) => {
  const [currentConversationUserOther, setCurrentConversationUserOther] =
    useState();
  const [currentConversationName, setCurrentConversationName] = useState('');
  const [currentChatId, setCurrentChatId] = useState('');

  useEffect(() => {
    if (conversationUserOther.length) {
      const newChatName =
        conversationUserOther?.chatName || conversationUserOther.length > 1
          ? conversationUserOther
              .map((item) => {
                return item?.userName;
              })
              .join(', ')
          : conversationUserOther[0]?.userName;

      setCurrentChatId(conversationData.chatID);
      setCurrentConversationUserOther(conversationUserOther);
      setCurrentConversationName(newChatName);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationUserOther]);

  const handleChatAction = () => {
    onClickChatAction && onClickChatAction();
  };

  const handleSendMessage = (value) => {
    onSendMessage && onSendMessage(conversationData?.chatID, value);
  };

  const handleAddNewChat = () => {
    onAddNewChat && onAddNewChat();
  };

  const handleClickConversation = (chatId) => {
    setCurrentChatId(chatId);

    let chatIdOld = conversationData?.chatID || 0;

    if (chatIdOld === chatId) return;
    onClickConversation && onClickConversation(chatId, chatIdOld);
  };

  return (
    <MainContainer style={{ border: 'none' }} responsive>
      <Sidebar position='left' scrollable>
        <ConversationHeader
          className='conversations-header'
          style={{
            backgroundColor: '#fff',
            padding: '24px 0.6em 12px',
          }}
        >
          <ConversationHeader.Content
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            {user.userName}
            <div
              className='conversations-header__search'
              onClick={() => handleAddNewChat()}
            >
              <SearchChat />
            </div>
          </ConversationHeader.Content>
        </ConversationHeader>

        <div className='chat-title-container'>
          <span>Message</span>
        </div>

        <ConversationList>
          {chatData?.length > 0 &&
            chatData?.map((chat) => {
              const userOthersInfo = chat.userOther;
              // let currentConversationStatus = chat.statusChat;
              const chatName =
                chat?.chatName ||
                chat?.userOther
                  ?.map((item) => {
                    return item?.userName;
                  })
                  .join(', ');

              // if (conversationData?.chatID === chat?.chatID) {
              //   currentConversationStatus = conversationData.statusChat;
              // }

              return (
                <Conversation
                  key={uuidv4()}
                  name={chatName}
                  info={chat.message}
                  active={chat.chatID === currentChatId}
                  // unreadDot={currentConversationStatus}
                  // className={classNames({
                  //   'new-chat-conversation': currentConversationStatus,
                  // })}
                  onClick={() => {
                    if (isConversationLoading) return;

                    handleClickConversation(chat.chatID);
                    setCurrentConversationName(chatName);
                    setCurrentConversationUserOther(userOthersInfo);
                  }}
                >
                  {userOthersInfo?.length > 1 ? (
                    <AvatarGroup
                      size='sm'
                      max={4}
                      hoverToFront={false}
                      className={classNames({
                        'center-at-two': userOthersInfo?.length === 2,
                      })}
                      style={{
                        width: `${
                          userOthersInfo?.length > 2 ? '40px' : 'unset'
                        }`,
                      }}
                    >
                      {userOthersInfo?.map((userOther) => {
                        return (
                          <Avatar
                            key={uuidv4()}
                            src={DISPLAY_BASE64.IMAGE + userOther?.base64Image}
                            name={chatName}
                          />
                        );
                      })}
                    </AvatarGroup>
                  ) : (
                    <Avatar
                      status={chat?.statusChat ? 'available' : 'unavailable'}
                      src={
                        DISPLAY_BASE64.IMAGE + userOthersInfo?.[0]?.base64Image
                      }
                    />
                  )}
                </Conversation>
              );
            })}
        </ConversationList>
      </Sidebar>
      <ChatContainer>
        <MessageList style={{ position: 'relative' }}>
          {conversationData && (
            <ConversationHeader>
              {currentConversationUserOther?.length > 1 ? (
                <AvatarGroup
                  size='md'
                  max={4}
                  className={classNames({})}
                  hoverToFront={false}
                  style={{
                    width: 'unset',
                  }}
                >
                  {currentConversationUserOther?.map((userOther) => (
                    <Avatar
                      key={uuidv4()}
                      src={DISPLAY_BASE64.IMAGE + userOther?.base64Image}
                      name={userOther.userName}
                    />
                  ))}
                </AvatarGroup>
              ) : (
                <Avatar
                  src={
                    DISPLAY_BASE64.IMAGE +
                    currentConversationUserOther?.[0]?.base64Image
                  }
                  name={currentConversationUserOther?.[0]?.userName}
                />
              )}
              <ConversationHeader.Content userName={currentConversationName} />
              <ConversationHeader.Actions>
                <EllipsisButton
                  orientation='vertical'
                  onClick={() => handleChatAction()}
                />
              </ConversationHeader.Actions>
            </ConversationHeader>
          )}
          {isConversationLoading && (
            <ModalLoadingCircle
              modalClassName={classNames('conversation-loading', {
                'have-header': !!conversationData,
              })}
            />
          )}
          <div className='message-container'>
            {messageData?.length > 0 &&
              messageData?.map((messageInfo) => {
                const userBase64Image = conversationUserInfo?.find(
                  (userInfo) => userInfo.userId === messageInfo.createById,
                )?.base64Image;

                const direction =
                  user.userId === messageInfo.createById
                    ? CHAT_TYPE.OUTGOING
                    : CHAT_TYPE.INCOMING;

                return (
                  <MessageGroup key={uuidv4()} direction={direction}>
                    <Avatar
                      src={DISPLAY_BASE64.IMAGE + userBase64Image}
                      name={messageInfo.userName}
                    />
                    <MessageGroup.Messages>
                      <Message
                        sender={messageInfo.createByUserName}
                        model={{
                          type: 'html',
                          payload: messageInfo.message,
                          direction: direction,
                          position: 'normal',
                        }}
                      />
                    </MessageGroup.Messages>
                  </MessageGroup>
                );
              })}
          </div>
        </MessageList>

        {conversationData && (
          <MessageInput
            onSend={handleSendMessage}
            disabled={false}
            attachButton={false}
            placeholder='Type here...'
          />
        )}
      </ChatContainer>
    </MainContainer>
  );
};
