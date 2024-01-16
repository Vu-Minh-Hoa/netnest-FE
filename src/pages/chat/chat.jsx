import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Chat } from '../../components/chat/MainChat';
import ChatModal from '../../components/chatModal/chatModal';
import ModalLoadingCircle from '../../components/common/loadingCircle/loadingCircle';
import { API_LIST } from '../../contants/common';
import { useAction } from '../../hooks/useAction';
import { get, post } from '../../services/request';
import './chat.scss';

const ChatPage = () => {
  const [messageData, setMessageData] = useState();
  const [currentConversationUserOther, setCurrentConversationUserOther] =
    useState([]);
  const [conversationUserInfo, setConversationUserInfo] = useState();
  const [conversationData, setConversationData] = useState();
  const [isConversationLoading, setIsConversationLoading] = useState(false);
  const [isAddNewChat, setIsAddNewChat] = useState(false);
  const [isChatPageLoading, setIsChatPageLoading] = useState(false);
  const [chatData, setChatdata] = useState();
  const { token, user } = useSelector((store) => store.user);
  const { action, actionAll } = useAction();

  useEffect(() => {
    if (!token) return;
    getChatData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const getChatData = async () => {
    await actionAll([getChatAll()]);
  };

  const getChatAll = async () => {
    if (!conversationData) setIsChatPageLoading(true);

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
    if (!conversationData) setIsChatPageLoading(false);
  };

  const getConversationData = async (chatIdNew, chatIdOld = 0) => {
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

  const handleGetConversation = (chatIdNew, chatIdOld) => {
    getConversationData(chatIdNew, chatIdOld);
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
    setIsConversationLoading(false);
  };

  const handleCreateChat = (data) => {
    const newUserOther = data.userOther.filter(
      (item) => item.userId !== user.userId,
    );
    setConversationData(data);
    setMessageData(data.message);
    setCurrentConversationUserOther(newUserOther);
    setConversationUserInfo(data.userOther);
    setIsAddNewChat(false);
  };

  const handleOpenAddNewChat = () => {
    setIsAddNewChat(true);
  };

  const handleCloseAddNewChat = () => {
    setIsAddNewChat(false);
  };

  const resetData = () => {
    setMessageData('');
  };

  return (
    <>
      {isAddNewChat && (
        <ChatModal
          onCreateChat={handleCreateChat}
          onClose={handleCloseAddNewChat}
        />
      )}
      {isChatPageLoading ? (
        <ModalLoadingCircle />
      ) : (
        <div className='h-100 d-flex flex-column overflow-hidden'>
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
                  conversationData={conversationData}
                  conversationUserInfo={conversationUserInfo}
                  onClickConversation={handleGetConversation}
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
