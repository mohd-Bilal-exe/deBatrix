import { Router } from "express";
const state = require("../global/states");
const router = Router();
router.post("/", async (req, res) => {// Here set the topic and mood for the session
  const { topic, mood, tone, uid } = req.body;
  
  async function initializeUser() {
    if (!state.users[uid]) {
      state.users[uid] = {
        uid,
        topic: "",
        mood: "",
        tone: "",
        sessionId: "",
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
export default router;