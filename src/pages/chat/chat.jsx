import SendbirdApp from '@sendbird/uikit-react/App';
import '@sendbird/uikit-react/dist/index.css';

const ChatPage = () => {
  return (
    <div className='App'>
      <SendbirdApp
        // Add the two lines below.
        appId={'729B99DA-D831-4D01-9396-1E58C6506F03'} // Specify your Sendbird application ID.
        userId={'sendbird_desk_agent_id_d990592c-6336-447c-97a3-98bebdee9067'} // Specify your user ID.
      />
    </div>
  );
};

export default ChatPage;
