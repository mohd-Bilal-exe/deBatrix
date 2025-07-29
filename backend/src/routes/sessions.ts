import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = Router();

// Create new session
router.post("/", async (req, res) => {
  const { topic, mood } = req.body;
  const session = await prisma.session.create({
    data: { topic, mood },
  });
  res.json(session);
});

// Add message to session
router.post("/:id/messages", async (req, res) => {
  const { content, role } = req.body;
  const { id } = req.params;
  const message = await prisma.message.create({
    data: {
      content,
      role,
      sessionId: id,
    },
  });
  res.json(message);
});

// Get session messages
router.get("/:id/messages", async (req, res) => {
  const { id } = req.params;
  const messages = await prisma.message.findMany({
    where: { sessionId: id },
    orderBy: { timestamp: "asc" },
  });
  res.json(messages);
});

export default router;
