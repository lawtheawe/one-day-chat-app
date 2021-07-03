import React from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/macro';

import ButtonWithIcon from '../../../components/ButtonWithIcon';
import UL from '../../../components/UL';
import Message from '../Message';

const StyledUL = styled(UL)`
  display: flex;
  flex-direction: column;
`;

const MessageItem = styled.li<{ reverse?: boolean }>`
  display: flex;
  margin-bottom: 40px;

  :last-child {
    margin: auto 0 0 0;
  }

  .chat-avatar {
    margin-right: 20px;
  }
`;

const ViewMessages = ({ className }: { className?: string }) => {
  return (
    <StyledUL className={className}>
      <MessageItem>
        <ButtonWithIcon label='Read More' icon={faArrowUp} />
      </MessageItem>
      <MessageItem>
        <Message user={'Russell'} content={'testing'} time={'08:55'} />
      </MessageItem>

      <MessageItem>
        <Message
          reverse
          user='Russell'
          content='testing d'
          time='08:55'
          state='Sent'
        />
      </MessageItem>

      <MessageItem>
        <ButtonWithIcon label='Read More' icon={faArrowDown} />
      </MessageItem>
    </StyledUL>
  );
};

export default ViewMessages;
