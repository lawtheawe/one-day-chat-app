import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import { CHANNELS } from '../data';
import { ChannelProps, UserProps } from '../types';

const GET_LATEST_MESSAGES = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

const POST_MESSAGE = gql`
  mutation ($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

interface Message {
  __typename?: 'Message';
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
}

interface Chat {
  user: UserProps;
  channel: ChannelProps;
  messages: Message[];
}

type ActionType =
  | { type: 'USER_CHANGE'; user: UserProps }
  | { type: 'CHANNEL_CHANGE'; channelId: ChannelProps['id'] }
  | { type: 'ADD_MESSAGES'; messages: Message[] }
  | { type: 'NEW_CHANNEL_MESSAGES'; messages: Message[] };

type UseChatManagerResult = ReturnType<typeof useChatsManager>;

const ChatContext = createContext<UseChatManagerResult>({
  chat: {
    user: '',
    channel: { name: '', id: '' },
    messages: [],
  },
  selectUser: () => {},
  selectChannel: () => {},
  postMessage: () => {},
});

function useChatsManager(initialChat: Chat): {
  chat: Chat;
  selectUser: (user: UserProps) => void;
  selectChannel: (channelId: string) => void;
  postMessage: (message: string) => void;
} {
  const [chat, dispatch] = useReducer((state: Chat, action: ActionType) => {
    switch (action.type) {
      case 'USER_CHANGE':
        return {
          ...state,
          user: action.user,
        };
      case 'CHANNEL_CHANGE':
        const channel = CHANNELS.find(
          (channel) => channel.id === action.channelId
        ) || { name: '', id: '' };
        return {
          ...state,
          channel,
        };
      case 'NEW_CHANNEL_MESSAGES':
        return {
          ...state,
          messages: action.messages,
        };
      case 'ADD_MESSAGES':
        return {
          ...state,
          messages: [...state.messages, ...action.messages],
        };
      default:
        throw new Error();
    }
  }, initialChat);

  const [getMessages, { data: latestMessagesData }] = useLazyQuery<{
    fetchLatestMessages: Message[];
  }>(GET_LATEST_MESSAGES, {
    variables: { channelId: chat.channel.id },
  });

  const [postMessageMutation] = useMutation<{
    postMessage: Message;
  }>(POST_MESSAGE);

  const selectUser = useCallback((user: UserProps) => {
    dispatch({
      type: 'USER_CHANGE',
      user,
    });
  }, []);

  const selectChannel = useCallback((channelId: string) => {
    dispatch({
      type: 'CHANNEL_CHANGE',
      channelId,
    });
  }, []);

  const postMessage = useCallback(
    async (message: string) => {
      try {
        const newMessage = await postMessageMutation({
          variables: {
            channelId: chat.channel.id,
            text: message,
            userId: chat.user,
          },
        });

        if (newMessage.data) {
          dispatch({
            type: 'ADD_MESSAGES',
            messages: [newMessage.data.postMessage],
          });
        }
      } catch (error) {
        console.log('error', error);

        dispatch({
          type: 'ADD_MESSAGES',
          messages: [
            {
              messageId: uuidv4(),
              text: message,
              datetime: new Date().toISOString(),
              userId: chat.user,
            },
          ],
        });
      }
    },
    [chat.channel.id, chat.user, postMessageMutation]
  );

  useEffect(() => {
    getMessages();
  }, [getMessages, chat.channel]);

  useEffect(() => {
    if (latestMessagesData) {
      const reverseLatestMessages = [
        ...latestMessagesData.fetchLatestMessages,
      ].reverse();

      dispatch({
        type: 'NEW_CHANNEL_MESSAGES',
        messages: reverseLatestMessages,
      });
    }
  }, [latestMessagesData]);

  return { chat, selectUser, selectChannel, postMessage };
}

export const ChatsProvider: React.FunctionComponent<{
  initialChat: Chat;
}> = ({ initialChat, children }) => (
  <ChatContext.Provider value={useChatsManager(initialChat)}>
    {children}
  </ChatContext.Provider>
);

export const useChatUser = (): string => {
  const { chat } = useContext(ChatContext);

  return chat.user;
};

export const useChatChannel = (): ChannelProps => {
  const { chat } = useContext(ChatContext);

  return chat.channel;
};

export const useChatMessages = (): Message[] => {
  const { chat } = useContext(ChatContext);

  return chat.messages;
};

export const useSelectUser = (): UseChatManagerResult['selectUser'] => {
  const { selectUser } = useContext(ChatContext);

  return selectUser;
};

export const useSelectChannel = (): UseChatManagerResult['selectChannel'] => {
  const { selectChannel } = useContext(ChatContext);

  return selectChannel;
};

export const usePostMessage = (): UseChatManagerResult['postMessage'] => {
  const { postMessage } = useContext(ChatContext);

  return postMessage;
};
