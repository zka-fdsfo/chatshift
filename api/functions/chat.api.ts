import { getCookie } from "@/lib/functions/storage.lib";
import axiosInstance from "../axiosInstance"
import { endpoints } from "../endpoints";
import axios from "axios";
import { ChatConfirm, ChatConversation } from "@/interface/chat.interfaces";




export const conversation = async (body: ChatConversation) => {
  const res = await axiosInstance.post(endpoints.chat.chat_conversation, body);
  return res.data;
};


export const confirm = async (body: ChatConfirm) => {
  const res = await axiosInstance.post(endpoints.chat.chat_conversation, body);
  return res.data;
};

export const getChatHistory = async (sessionId: string) => {
  const res = await axiosInstance.get(endpoints.chat.chat_history(sessionId));
  return res.data;
};
