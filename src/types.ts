export interface ChannelProps {
  name: string;
  id: string;
}

export type UserProps = string;

export interface MessageProps {
  __typename?: 'Message';
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
}

export enum MsgState {
  SENT = 'Sent',
  ERROR = 'Error',
}
export interface MessageWithState extends MessageProps {
  state: MsgState;
}
