import React from 'react';
import styled from 'styled-components/macro';

import { useChatChannel } from '../../../hooks/useChats';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  min-height: 64px;
  line-height: 64px;
  border-bottom: 1px solid #e6ecf3;
  border-radius: 0 3px 0 0;
`;

const ActiveChannel = () => {
  const channel = useChatChannel();
  return (
    <Wrapper>
      <span>{channel.name}</span>
    </Wrapper>
  );
};

export default ActiveChannel;
