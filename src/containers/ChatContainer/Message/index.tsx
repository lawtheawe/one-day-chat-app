import React from 'react';
import {
  faCheckCircle,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components/macro';

import Avatar from '../../../components/Avatar';
import { toHHmm } from '../../../utils/datetime';

const AvatarText = styled.div`
  font-size: 0.75rem;
  color: #999999;
  text-align: center;
`;

const AvatarWithText = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContent = styled.div`
  ::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    top: 10px;
    left: -20px;
    border: 10px solid;
    border-color: transparent #ffffff transparent transparent;
  }

  padding: 0.4rem 1rem;
  border-radius: 4px;
  background: #ffffff;
  font-weight: 300;
  line-height: 150%;
  position: relative;
`;

const MessageMeta = styled.div`
  display: flex;
  align-items: center;
`;

const MessageState = styled.span`
  font-size: 0.75rem;
  color: #999999;
  text-align: center;
`;

const MessageTime = styled.div`
  padding: 0;
  margin-left: 10px;
  font-size: 0.8rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MessageWrapper = styled.div<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  margin-left: ${({ reverse }) => (reverse ? 'auto' : 'initial')};

  ${AvatarWithText} {
    ${({ reverse }) => (reverse ? `margin-left: 20px` : `margin-right: 20px`)}
  }

  ${MessageContent} {
    ::before {
      ${({ reverse }) =>
        reverse &&
        `right: -20px;
    border-color: transparent transparent transparent #ffffff;
    left: inherit;`}
    }
  }
`;

const Message = ({
  user,
  content,
  time,
  reverse = false,
  state = '',
}: {
  user: string;
  content: string;
  time: string;
  reverse?: boolean;
  state?: string;
}) => {
  return (
    <MessageWrapper reverse={reverse}>
      <AvatarWithText>
        <Avatar src={`./users/${user}.png`} alt={user} />
        <AvatarText>{user}</AvatarText>
      </AvatarWithText>
      <MessageContent>{content}</MessageContent>
      <MessageMeta>
        <MessageTime>{toHHmm(time)}</MessageTime>
        {state && (
          <>
            {state === 'Sent' ? (
              <FontAwesomeIcon icon={faCheckCircle} color='#9ec94a' />
            ) : (
              <FontAwesomeIcon icon={faExclamationCircle} color='#b71e3c' />
            )}
            <MessageState>{state}</MessageState>
          </>
        )}
      </MessageMeta>
    </MessageWrapper>
  );
};

export default Message;
