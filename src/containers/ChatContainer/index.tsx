import styled from 'styled-components/macro';

import ActiveChannel from './ActiveChannel';
import SendMessageForm from './SendMessageForm';
import ViewMessages from './ViewMessages';

const MessagesContainer = styled.div`
  position: relative;
  padding: 1rem;
  max-height: 80vh;

  flex-grow: 2;

  display: flex;
  flex-direction: column;

  > .view-messages-container {
    flex-grow: 2;
    overflow: scroll;

    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }

    ::-webkit-scrollbar-track {
      background: #f4f5fb;
    }

    ::-webkit-scrollbar-thumb {
      background: gray;
    }
  }
`;

const ChatContainer = () => {
  return (
    <>
      <ActiveChannel />
      <MessagesContainer>
        <ViewMessages className='view-messages-container' />
        <SendMessageForm />
      </MessagesContainer>
    </>
  );
};

export default ChatContainer;
