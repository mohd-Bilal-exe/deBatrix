import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createChatInstance } from "../messages/instances/chatInstance";
const state = require("../global/states");

const prisma = new PrismaClient();
const router = Router();

// Create new session
router.post("/", async (req, res) => {// Here set the topic and mood for the session
  const { uid } = req.body;
  
  async function initializeUser() {
    if (!state.users[uid]) {
      state.users[uid] = {
        uid,
        topic: "",
        messages: [],
        chatInstance: null,
        forChatInstance: null,
        againstChatInstance: null,
        isLoading: false,
        error: null
      };
    }
  }initializeUser();

res.json({ message: "User initialized", user: state.users[uid] });
});
router.post("/for-chat-init", async (req, res) => {// Here set the topic and mood for the session
  const { topic, mood, tone, persona, egHuman, uid } = req.body;
  
  async function initializeUser() {
    if (state.users[uid]) {
      state.users[uid] = {
        ...state.users[uid],
        topic: topic,
        forChatProperties: {
          topic,
          mood,
          tone,
          personality: persona,
          egHuman
        },
      };
    }
  } initializeUser();
  if (state.users[uid]) {
    var forChatInstance = null;
    const history=[
      {
        role: "user",
        parts:[{ text:`You are a ${persona} who think, speak and write somewhat like ${egHuman}.Currently who is in ${mood} mood and you are talking with ${tone} tone.`}]
      },
      {
        role: "user",
        parts:[{ text:`Now lets have a debate on this topic: ${topic}
        You are the first speaker.
        Points to keep in mind replying
        1. Keep the debate on the topic
        2. Keep you tone:- ${tone}
        3. You are in ${mood} mood.
        4. You have personality like ${persona}.
         ${
          egHuman?`
          5. You are speaking like ${egHuman} with personality like ${persona}.
          6. You are speaking for the topic.
          7. Stick to the language that suits best to your persona and ${egHuman}
          8. Try Keeping word count from 70-100.
          `
          :
          `5. You are speaking for the topic.
          6. You are speaking for the topic.
          7. Stick to the english language giving our responses.
          8. Try Keeping word count from 70-100.`
        }
          `}]
      }
    ]
    forChatInstance=await createChatInstance({history, uid, type:"forChatInstance"})
    state.users[uid].forChatInstance=forChatInstance
  }
  console.log("Setting local values:", state);
res.json({ message: "For chat initialized" });
});
router.post("/against-chat-init", async (req, res) => {// Here set the topic and mood for the session
  const { topic, mood, tone, persona, egHuman, uid } = req.body;
  
  async function initializeUser() {
    if (state.users[uid]) {
      state.users[uid] = {
        ...state.users[uid],
        topic: topic,
        againstChatProperties: {
          topic,
          mood,
          tone,
          personality: persona,
          egHuman
        },
      };
    }
    
  }initializeUser();
  if (state.users[uid]) {
    var againstChatInstance = null;
      const history=[
        {
          role: "user",
          parts:[{ text: `You are a ${persona} who think, speak and write somewhat like ${egHuman}.Currently who is in ${mood} mood and you are talking with ${tone} tone.`}]
        },
        {
          role: "user",
          parts:[{ text: `Now lets have a debate on this topic: ${topic}
          You are the first speaker.
          Points to keep in mind replying
          1. Keep the debate on the topic
          2. Keep you tone:- ${tone}
          3. You are in ${mood} mood.
          4. You have personality like ${persona}.
          ${
          egHuman?`
          5. You are speaking like ${egHuman} with personality like ${persona}.
          6. You are speaking against the topic.
          7. Stick to the language that suits best to your persona and ${egHuman}.
          8. Try Keeping word count from 70-100.
          `
          :
          `5. You are speaking against the topic.
          6. You are speaking against the topic.
          7. Stick to the english language giving our responses.
          8. Try Keeping word count from 70-100.`
        }
          `}]
        }
      ]
      againstChatInstance=await createChatInstance({history, uid,type:"againstChatInstance"})
      state.users[uid].againstChatInstance=againstChatInstance
    }
res.json({ message: "Against chat initialized" });
});

router.post("/for-chat-send", async (req, res) => {
  const { message, uid } = req.body;
  const forChatInstance = state.users[uid].forChatInstance;
  if (!forChatInstance) {
    return res.status(400).json({ error: "For chat instance is not initialized", forChatInstance });
  }
  const response = await forChatInstance.sendMessage({
    message,
  });
  res.json({ message: response.text, success:true });
});
router.post("/against-chat-send", async (req, res) => {
  const { message, uid } = req.body;
  const againstChatInstance = state.users[uid].againstChatInstance;
  if (!againstChatInstance) {
    return res.status(400).json({ error: "For chat instance is not initialized" });
  }
  const response = await againstChatInstance.sendMessage({
    message,
  });
  res.json({ message: response.text, success:true });
});
export default router;
