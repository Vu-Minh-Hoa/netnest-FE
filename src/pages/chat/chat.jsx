import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  BasicStorage,
  ChatProvider,
  Conversation,
  ConversationRole,
  Participant,
  Presence,
  TypingUsersList,
  User,
  UserStatus,
} from '@chatscope/use-chat';
import { AutoDraft } from '@chatscope/use-chat/dist/enums/AutoDraft';
import { ExampleChatService } from '@chatscope/use-chat/dist/examples';
import 'bootstrap/dist/css/bootstrap.min.css';
import { nanoid } from 'nanoid';
import { Col, Container, Row } from 'react-bootstrap';
import {
  akaneModel,
  eliotModel,
  emilyModel,
  joeModel,
  users,
} from '../../data/data';
import { Chat } from '../../components/chat/MainChat';
import './chat.scss';
// sendMessage and addMessage methods can automagically generate id for messages and groups
// This allows you to omit doing this manually, but you need to provide a message generator
// The message id generator is a function that receives message and returns id for this message
// The group id generator is a function that returns string
const messageIdGenerator = (message) => nanoid();
const groupIdGenerator = () => nanoid();

const akaneStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const eliotStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const emilyStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });
const joeStorage = new BasicStorage({ groupIdGenerator, messageIdGenerator });

const ChatPage = () => {
  return (
    <div className='h-100 d-flex flex-column overflow-hidden'>
      <Container
        fluid
        className='flex-grow-1 position-relative overflow-hidden chat-page-container'
      >
        <Row className='h-50 pb-2 flex-nowrap chat-page-chat'>
          <Col>
            <ChatProvider
              serviceFactory={serviceFactory}
              storage={akaneStorage}
              config={{
                typingThrottleTime: 250,
                typingDebounceTime: 900,
                debounceTyping: true,
                autoDraft: AutoDraft.Save | AutoDraft.Restore,
              }}
            >
              <ChatProvider
                serviceFactory={serviceFactory}
                storage={eliotStorage}
                config={{
                  typingThrottleTime: 250,
                  typingDebounceTime: 900,
                  debounceTyping: true,
                  autoDraft: AutoDraft.Save | AutoDraft.Restore,
                }}
              />
              <Chat user={akane} user2={eliot} />
            </ChatProvider>
          </Col>
          {/* <Col>
            <ChatProvider
              serviceFactory={serviceFactory}
              storage={eliotStorage}
              config={{
                typingThrottleTime: 250,
                typingDebounceTime: 900,
                debounceTyping: true,
                autoDraft: AutoDraft.Save | AutoDraft.Restore,
              }}
            >
              <Chat user={eliot} />
            </ChatProvider>
          </Col> */}
        </Row>
        {/* <Row className='h-50 pt-2 flex-nowrap'>
          <Col>
            <ChatProvider
              serviceFactory={serviceFactory}
              storage={emilyStorage}
              config={{
                typingThrottleTime: 250,
                typingDebounceTime: 900,
                debounceTyping: true,
                autoDraft: AutoDraft.Save | AutoDraft.Restore,
              }}
            >
              <Chat user={emily} />
            </ChatProvider>
          </Col>
          <Col>
            <ChatProvider
              serviceFactory={serviceFactory}
              storage={joeStorage}
              config={{
                typingThrottleTime: 250,
                typingDebounceTime: 900,
                debounceTyping: true,
                autoDraft: AutoDraft.Save | AutoDraft.Restore,
              }}
            >
              <Chat user={joe} />
            </ChatProvider>
          </Col>
        </Row> */}
      </Container>
    </div>
  );
};

// Create serviceFactory
const serviceFactory = (storage, updateState) => {
  return new ExampleChatService(storage, updateState);
};

const akane = new User({
  id: akaneModel.name,
  presence: new Presence({ status: UserStatus.Available, description: '' }),
  firstName: '',
  lastName: '',
  username: akaneModel.name,
  email: '',
  avatar: akaneModel.avatar,
  bio: '',
});

const emily = new User({
  id: emilyModel.name,
  presence: new Presence({ status: UserStatus.Available, description: '' }),
  firstName: '',
  lastName: '',
  username: emilyModel.name,
  email: '',
  avatar: emilyModel.avatar,
  bio: '',
});

const eliot = new User({
  id: eliotModel.name,
  presence: new Presence({ status: UserStatus.Available, description: '' }),
  firstName: '',
  lastName: '',
  username: eliotModel.name,
  email: '',
  avatar: eliotModel.avatar,
  bio: '',
});

const joe = new User({
  id: joeModel.name,
  presence: new Presence({ status: UserStatus.Available, description: '' }),
  firstName: '',
  lastName: '',
  username: joeModel.name,
  email: '',
  avatar: joeModel.avatar,
  bio: '',
});

const chats = [
  { name: 'Akane', storage: akaneStorage },
  { name: 'Eliot', storage: eliotStorage },
  { name: 'Emily', storage: emilyStorage },
  { name: 'Joe', storage: joeStorage },
];

function createConversation(id, name) {
  return new Conversation({
    id,
    participants: [
      new Participant({
        id: name,
        role: new ConversationRole([]),
      }),
    ],
    unreadCounter: 0,
    typingUsers: new TypingUsersList({ items: [] }),
    draft: '',
  });
}

// Add users and conversations to the states
chats.forEach((c) => {
  users.forEach((u) => {
    if (u.name !== c.name) {
      c.storage.addUser(
        new User({
          id: u.name,
          presence: new Presence({
            status: UserStatus.Available,
            description: '',
          }),
          firstName: '',
          lastName: '',
          username: u.name,
          email: '',
          avatar: u.avatar,
          bio: '',
        }),
      );

      const conversationId = nanoid();

      const myConversation = c.storage
        .getState()
        .conversations.find(
          (cv) =>
            typeof cv.participants.find((p) => p.id === u.name) !== 'undefined',
        );
      if (!myConversation) {
        c.storage.addConversation(createConversation(conversationId, u.name));

        const chat = chats.find((chat) => chat.name === u.name);

        if (chat) {
          const hisConversation = chat.storage
            .getState()
            .conversations.find(
              (cv) =>
                typeof cv.participants.find((p) => p.id === c.name) !==
                'undefined',
            );
          if (!hisConversation) {
            chat.storage.addConversation(
              createConversation(conversationId, c.name),
            );
          }
        }
      }
    }
  });
});

export default ChatPage;
