import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { createChatInstance } from "../messages/helpers/chatInstance";
import { againstDebatePrompt, forDebatePrompt, introPrompt } from "../global/prompts";
import sendMessage from "../messages/helpers/sendMessage";
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
        parts:[{ text: introPrompt(persona, egHuman, mood, tone) }]
      },
      {
        role: "user",
        parts:[{ text:forDebatePrompt(topic, mood, tone, persona, egHuman),}]
      }
    ]
    forChatInstance=await createChatInstance({history, uid, type:"forChatInstance"})
    state.users[uid].forChatInstance=forChatInstance
  }
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
          parts:[{ text:introPrompt(persona, egHuman, mood, tone) }]
        },
        {
          role: "user",
          parts:[{ text: againstDebatePrompt(topic, mood, tone, persona, egHuman)}]
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
  const response = await  sendMessage(forChatInstance, message)
  res.json({ message: response, success:true });
});
router.post("/against-chat-send", async (req, res) => {
  const { message, uid } = req.body;
  const againstChatInstance = state.users[uid].againstChatInstance;
  if (!againstChatInstance) {
    return res.status(400).json({ error: "For chat instance is not initialized" });
  }
  const response = await  sendMessage(againstChatInstance, message)
  res.json({ message: response, success:true });
});
export default router;
