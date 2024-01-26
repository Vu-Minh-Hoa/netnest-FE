import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Chat } from '../../components/chat/MainChat';
import ChatModal from '../../components/chatModal/chatModal';
import ModalLoadingCircle from '../../components/common/loadingCircle/loadingCircle';
import { API_LIST, USER_CHAT_ACTION } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { deleteMethod, get, post } from '../../services/request';
import './chat.scss';

const ChatPage = () => {
  const [messageData, setMessageData] = useState();
  const [currentConversationUserOther, setCurrentConversationUserOther] =
    useState([]);
  const [conversationUserInfo, setConversationUserInfo] = useState();
  const [conversationData, setConversationData] = useState({});
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const [changedConversation, setChangedConversation] = useState(0);
  const [currentUserAction, setCurrentUserAction] = useState(false);
  const [isChatPageLoading, setIsChatPageLoading] = useState(false);
  const [chatData, setChatdata] = useState();
  const { token, user } = useSelector((store) => store.user);
  const { action, actionAll } = useAction();

  useEffect(() => {
    if (!token) return;
    getChatAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // useEffect(() => {
  //   if (Object.keys(conversationData).length <= 0) return;
  //   const checkMessInterval = setInterval(async () => {
  //     await checkChatData();
  //   }, 5000);

  //   return () => clearInterval(checkMessInterval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [conversationData]);

  const checkChatData = async () => {
    await actionAll([getCheckMessge(), getChatAll()]);
  };

  const getChatAll = async () => {
    if (!chatData) setIsChatPageLoading(true);

    await action({
      action: async () =>
        await get({
          url: `${API_LIST.get_chat_all}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
          },
        }),
      onSuccess: async (data) => {
        setChatdata(data);
      },
    });
    if (!Object.keys(conversationData).length) setIsChatPageLoading(false);
  };

  const getConversationData = async (chatIdNew, chatIdOld = 0) => {
    setChangedConversation(chatIdNew);
    setIsConversationLoading(true);
    resetData();
    await action({
      action: async () =>
        await get({
          url: `${API_LIST.get_search_chat}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
            params: {
              chatIdNew,
              chatIdOld,
            },
          },
        }),
      onSuccess: async (data) => {
        setConversationData(data);
        setConversationUserInfo(data.userOther);
        setMessageData(data.message);
      },
    });
    setIsConversationLoading(false);
  };

  const getCheckMessge = async () => {
    await action({
      action: async () =>
        await get({
          url: `${API_LIST.get_check_messge}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
            params: {
              chatId: conversationData.chatID,
            },
          },
        }),
      onSuccess: async (data) => {
        setMessageData(data);
      },
    });
  };

  const handleSendMessage = async (chatID, value) => {
    setIsConversationLoading(true);
    await action({
      action: async () =>
        await post({
          url: `${API_LIST.post_add_message}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
          },
          data: {
            chatID,
            message: value,
          },
        }),
      onSuccess: async (data) => {
        await getChatAll();
        setMessageData(data);
      },
    });
    setIsConversationLoading(false);
  };

  const handleLeaveChat = async () => {
    console.log('leave');
    await action({
      action: async () =>
        await deleteMethod({
          url: `${API_LIST.del_leave_chat}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
            params: {
              chatId: conversationData.chatID,
            },
          },
        }),
      onSuccess: async (data) => {
        setChatdata(data);
        setConversationData('');
        setMessageData('');
      },
    });
  };

  const deleteMessage = async (messId) => {
    setIsConversationLoading(true);

    await action({
      action: async () =>
        await deleteMethod({
          url: `${API_LIST.del_mess}`,
          config: {
            headers: {
              authorization: 'Bearer ' + token,
            },
            params: {
              chatId: conversationData.chatID,
              messId: messId,
            },
          },
        }),
      onSuccess: async (data) => {
        setMessageData(data);
      },
    });
    setIsConversationLoading(false);
  };

  const handleDeleteMess = async (messId) => {
    await deleteMessage(messId);
  };

  const handleGetConversation = (chatIdNew, chatIdOld) => {
    getConversationData(chatIdNew, chatIdOld);
  };

  const handleCreateChat = (data) => {
    const newUserOther = data.userOther.filter(
      (item) => item.userId !== user.userId,
    );

    setConversationData(data);
    setMessageData(data.message);
    setCurrentConversationUserOther(newUserOther);
    setConversationUserInfo(data.userOther);
    setCurrentUserAction('');
  };

  const handleChatAction = () => {
    setCurrentUserAction(USER_CHAT_ACTION.USER_ACTION);
  };

  const handleOpenAddNewChat = () => {
    setCurrentUserAction(USER_CHAT_ACTION.SEARCH_USER_CHAT);
  };

  const handleCloseAddNewChat = () => {
    setCurrentUserAction('');
  };

  const resetData = () => {
    setMessageData('');
  };

  return (
    <>
      {currentUserAction && (
        <ChatModal
          onCreateChat={handleCreateChat}
          onClose={handleCloseAddNewChat}
          onLeaveChat={handleLeaveChat}
          currentUserAction={currentUserAction}
        />
      )}
      {isChatPageLoading ? (
        <ModalLoadingCircle />
      ) : (
        <div className='h-100 d-flex flex-column overflow-hidden chat-page'>
          <Container
            fluid
            className='flex-grow-1 position-relative overflow-hidden chat-page-container'
          >
            <Row className='h-50 pb-2 flex-nowrap chat-page-chat'>
              <Col>
                <Chat
                  user={user}
                  chatData={chatData}
                  onSendMessage={handleSendMessage}
                  conversationUserOther={currentConversationUserOther}
                  onAddNewChat={handleOpenAddNewChat}
                  isConversationLoading={isConversationLoading}
                  messageData={messageData}
                  onClickChatAction={handleChatAction}
                  conversationData={conversationData}
                  conversationUserInfo={conversationUserInfo}
                  onClickConversation={handleGetConversation}
                  onDeleteMess={handleDeleteMess}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default ChatPage;
