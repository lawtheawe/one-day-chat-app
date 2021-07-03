import React from 'react';
import styled from 'styled-components/macro';

import ActiveChannel from './ActiveChannel';
import SendMessageForm from './SendMessageForm';
import ViewMessages from './ViewMessages';

const MessagesContainer = styled.div`
  position: relative;
  padding: 1rem;

  flex-grow: 2;

  display: flex;
  flex-direction: column;

  > .view-messages-container {
    flex-grow: 2;
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
