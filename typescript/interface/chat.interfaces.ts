export interface ChatConversation {
  message: string;
  sessionId:string
}

export interface ChatConfirm {
  sessionId: string;
  action:string
}