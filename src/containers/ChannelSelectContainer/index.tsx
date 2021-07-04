import styled from 'styled-components/macro';

import UL from '../../components/UL';
import { CHANNELS } from '../../data';
import { useChatChannel, useSelectChannel } from '../../hooks/useChats';

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

const ChannelSelectContainer = () => {
  const activeChannel = useChatChannel();
  const selectChannel = useSelectChannel();

  const handleChannelClick = (channel: string) => {
    selectChannel(channel);
  };

  return (
    <>
      <p>2. Choose your Channel</p>
      <UL>
        {CHANNELS.map((channel) => (
          <ChannelItem
            key={channel.id}
            active={activeChannel.id === channel.id}
            onClick={() => handleChannelClick(channel.id)}
          >
            <p>
              <span>{channel.name}</span>
            </p>
          </ChannelItem>
        ))}
      </UL>
    </>
  );
};

export default ChannelSelectContainer;
