import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/macro';

import ButtonWithIcon from '../../../components/ButtonWithIcon';
import UL from '../../../components/UL';
import {
  useChatMessages,
  useChatUser,
  useGetMoreMessages,
} from '../../../hooks/useChats';
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
  const messages = useChatMessages();
  const getMoreMessages = useGetMoreMessages();
  const user = useChatUser();

  const handleReadMore = (old: boolean) => {
    getMoreMessages(old);
  };

  return (
    <StyledUL className={className}>
      {messages.length > 0 && (
        <>
          <MessageItem>
            <ButtonWithIcon
              label='Read More'
              icon={faArrowUp}
              onClick={() => handleReadMore(true)}
            />
          </MessageItem>
          {messages.map(({ messageId, text, datetime, userId, state }) => (
            <MessageItem key={messageId}>
              <Message
                reverse={user === userId}
                user={userId}
                content={text}
                time={datetime}
                state={state}
              />
            </MessageItem>
          ))}

          <MessageItem>
            <ButtonWithIcon
              label='Read More'
              icon={faArrowDown}
              onClick={() => handleReadMore(false)}
            />
          </MessageItem>
        </>
      )}
    </StyledUL>
  );
};

export default ViewMessages;
