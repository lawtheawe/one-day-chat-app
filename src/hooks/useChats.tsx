import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

type ActionType =
  | { type: 'USER_CHANGE'; user: string }
  | { type: 'CHANNEL_CHANGE'; channel: string };

interface Message {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
}

interface Chat {
  user: string;
  channel: string;
  messages: Message[];
}

type UseChatManagerResult = ReturnType<typeof useChatsManager>;

const ChatContext = createContext<UseChatManagerResult>({
  chat: {
    user: '',
    channel: '',
    messages: [],
  },
  selectUser: () => {},
  selectChannel: () => {},
  postMessage: () => {},
});

function useChatsManager(initialChat: Chat): {
  chat: Chat;
  selectUser: (user: string) => void;
  selectChannel: (channel: string) => void;
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
        return {
          ...state,
          channel: action.channel,
        };
      default:
        throw new Error();
    }
  }, initialChat);

  const selectUser = useCallback((user: string) => {
    dispatch({
      type: 'USER_CHANGE',
      user,
    });
  }, []);

  const selectChannel = useCallback((channel: string) => {
    dispatch({
      type: 'CHANNEL_CHANGE',
      channel,
    });
  }, []);

  const postMessage = useCallback((message: string) => {
    console.log('postMessage', message);
  }, []);

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

export const useChatChannel = (): string => {
  const { chat } = useContext(ChatContext);

  return chat.channel;
};

export const useChatMessages = (): Message[] => {
  const { chat } = useContext(ChatContext);

  return chat.messages || [];
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
