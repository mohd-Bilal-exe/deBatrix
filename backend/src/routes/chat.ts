import express from 'express';
import { PrismaClient, Role } from '@prisma/client';
import { generateDebateResponse } from '../lib/gemini';

const router = express.Router();
const prisma = new PrismaClient();

// Start a new debate session
router.post('/start', async (req, res) => {
  try {
    const { topic, mood, forPersonality, againstPersonality, userId } = req.body;

    const session = await prisma.debateSession.create({
      data: {
        topic,
        mood,
        forPersonality,
        againstPersonality,
        userId
      }
    });

    res.json({ chatId: session.id });
  } catch (error) {
    console.error('Error starting debate:', error);
    res.status(500).json({ error: 'Failed to start debate session' });
  }
});

// Send a message in a debate
router.post('/message', async (req, res) => {
  try {
    const { chatId, role, message } = req.body;

    // Validate role
    if (!Object.values(Role).includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    // Get the debate session
    const session = await prisma.debateSession.findUnique({
      where: { id: chatId },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!session) {
      return res.status(404).json({ error: 'Debate session not found' });
    }

    // Get AI response
    const response = await generateDebateResponse(
      role,
      session.topic,
      session.mood,
      role === Role.FOR ? session.forPersonality : session.againstPersonality,
      session.messages.map(m => ({ role: m.role, content: m.content }))
    );

    // Save the new message
    const newMessage = await prisma.message.create({
      data: {
        sessionId: chatId,
        role,
        content: response
      }
    });

    res.json({ message: newMessage });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Get chat history
router.get('/:id', async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' }
        }
      }
    });

    if (!session) {
      return res.status(404).json({ error: 'Debate session not found' });
    }

    res.json(session);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
});

export default router;
