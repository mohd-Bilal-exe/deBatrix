import gemini from "../../api/gem_init";
const state = require("../../global/states");
export async function createChatInstance({history, uid, type}: {history: any[], uid: string, type:string}) {
 const chat =await gemini.chats.create({
    model: "gemini-2.5-flash",
    history: history,
  });
   console.log(
    `${type} instance created for user ${uid} \n Chat: `,state.users[uid][type]
  )
  return await chat;
 
}
export function sendForChatMessage({content, role, userId}: {content: string, role: string, userId: string}) {
  if (!state.users[userId].forChatInstance) {
    throw new Error("For chat instance is not initialized");
  }
  return state.users[userId].forChatInstance.sendMessage({
    content,
    role,
  });
}