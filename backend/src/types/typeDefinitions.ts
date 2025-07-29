export type USERDATA = {
  uid: string;
  topic: string;
  sessionId: string;
  messages: any[];
  chatInstance: any;
  forChatInstance: any;
  forChatProperties: CHATPROPERTIES;
  againstChatInstance: any;
  againstChatProperties: CHATPROPERTIES;
  isLoading: boolean;
  error: any;
};
export type CHATPROPERTIES = {
  topic: string;
  mood: string;
  tone: string;
  personality: string;
  egHuman:string
};
export type STATE = {
  users: Record<string, USERDATA>;
};