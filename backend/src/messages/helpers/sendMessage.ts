import { Chat } from "@google/genai";

export default async function sendMessage(chatInstance : Chat, message:string){
const response = await chatInstance.sendMessage({
    message,
  });
  return response.text;
}  
