import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

import { CHANNELS } from '../data';
import { POST_MESSAGE } from '../graphql/mutations';
import { FETCH_MORE_MESSAGES, GET_LATEST_MESSAGES } from '../graphql/queries';
import { ChannelProps, UserProps } from '../types';

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
  | { type: 'ADD_MESSAGES'; messages: Message[]; old?: boolean }
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
  getMoreMessages: () => {},
});

function useChatsManager(initialChat: Chat): {
  chat: Chat;
  selectUser: (user: UserProps) => void;
  selectChannel: (channelId: string) => void;
  postMessage: (message: string) => void;
  getMoreMessages: (old: boolean) => void;
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
          messages: action.old
            ? [...action.messages, ...state.messages]
            : [...state.messages, ...action.messages],
        };
      default:
        throw new Error();
    }
  }, initialChat);

  const { data: latestMessagesData } = useQuery<{
    fetchLatestMessages: Message[];
  }>(GET_LATEST_MESSAGES, {
    variables: { channelId: chat.channel.id },
    fetchPolicy: 'no-cache',
  });

  const [
    fetchMoreMessages,
    { data: fetchMoreMessagesData, variables: fetchMoreMessagesVar },
  ] = useLazyQuery<
    {
      fetchMoreMessages: Message[];
    },
    {
      channelId: string;
      messageId: string;
      old: boolean;
    }
  >(FETCH_MORE_MESSAGES);

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

  const getMoreMessages = useCallback(
    async (old: boolean) => {
      fetchMoreMessages({
        variables: {
          channelId: chat.channel.id,
          messageId: old
            ? chat.messages[0].messageId
            : chat.messages[chat.messages.length - 1].messageId,
          old,
        },
      });
    },
    [chat.channel.id, chat.messages, fetchMoreMessages]
  );

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

  useEffect(() => {
    const { old } = fetchMoreMessagesVar || {};

    if (fetchMoreMessagesData && old !== undefined) {
      const appendMessages = fetchMoreMessagesData.fetchMoreMessages;

      if (appendMessages.length > 0) {
        dispatch({
          type: 'ADD_MESSAGES',
          messages: old ? [...appendMessages].reverse() : appendMessages,
          old,
        });
      }
    }
  }, [fetchMoreMessagesData, fetchMoreMessagesVar]);

  return { chat, selectUser, selectChannel, postMessage, getMoreMessages };
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

export const useGetMoreMessages =
  (): UseChatManagerResult['getMoreMessages'] => {
    const { getMoreMessages } = useContext(ChatContext);

    return getMoreMessages;
  };
