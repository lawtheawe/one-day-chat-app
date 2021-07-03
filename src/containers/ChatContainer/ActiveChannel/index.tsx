import React from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  width: 100%;
  padding: 0 15px;
  min-height: 64px;
  line-height: 64px;
  border-bottom: 1px solid #e6ecf3;
  border-radius: 0 3px 0 0;
`;

const ActiveChannel = ({ channel }: { channel: string }) => {
  return (
    <Wrapper>
      <span>{channel}</span>
    </Wrapper>
  );
};

export default ActiveChannel;
