import React, { useState } from 'react';
import styled from 'styled-components/macro';

import UL from '../../components/UL';

const ChannelItem = styled.li<{ active: boolean }>`
  position: relative;
  width: 100%;
  padding: 10px 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f0f4f8;

  ${({ active }) =>
    active &&
    `
      background-color: #ffffff;
      background-image: -webkit-linear-gradient(right, #f7f9fb, #ffffff);
      background-image: linear-gradient(right, #f7f9fb, #ffffff);
    `}

  p {
    font-weight: 600;
    font-size: 0.85rem;
  }
`;

const channels = ['General Channel', 'Technology Channel', 'LGTM Channel'];

const ChannelSelectContainer = () => {
  const [activeChannel, setActiveChannel] = useState(channels[2]);

  return (
    <>
      <p>2. Choose your Channel</p>
      <UL>
        {channels.map((channel) => (
          <ChannelItem key={channel} active={activeChannel === channel}>
            <p>
              <span>{channel}</span>
            </p>
          </ChannelItem>
        ))}
      </UL>
    </>
  );
};

export default ChannelSelectContainer;
