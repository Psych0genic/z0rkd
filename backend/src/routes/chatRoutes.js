import express from 'express'
import Message from '../models/Message.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import fetch from 'node-fetch'

const router = express.Router()

// For now, static system prompt — later tie to persona
const systemPrompt = `You are a helpful, slightly glitchy AI assistant living in a neon-drenched cyberpunk world. You reply with insight and style.`

router.get('/history', authMiddleware, async (req, res) => {
  const history = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 })
  res.json({ history })
})

router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { message } = req.body
    if (!message || typeof message !== 'string' || message.trim() === '') {
      console.log('[Bad Request] Missing or invalid message:', req.body)
      return res.status(400).json({ message: 'Invalid message' })
    }

    // Save user message
    const userMsg = new Message({ userId: req.user.id, content: message, sender: 'user' })
    await userMsg.save()

    // Fetch chat history to build memory context
    const history = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 })
    const formattedHistory = history
      .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.content}`)
      .join('\n')

    const fullPrompt = `${systemPrompt}\n\n${formattedHistory}\nUser: ${message}\nAI:`

    console.log('[Final Prompt Sent to Ollama]\n', fullPrompt)

    // Send to Ollama
    const ollamaRes = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: fullPrompt,
        stream: false
      })
    })

    const data = await ollamaRes.json()
    const aiResponse = data.response?.trim() || '...'

    // Save AI response
    const aiMsg = new Message({ userId: req.user.id, content: aiResponse, sender: 'ai' })
    await aiMsg.save()

    console.log('[Ollama Response]', aiResponse)

    res.status(200).json({ response: aiResponse })
  } catch (err) {
    console.error('[Chat Error]', err)
    res.status(500).json({ message: 'Error generating response' })
  }
})

// 🧠 Get Memory Map (all messages for the user)
router.get('/memory', authMiddleware, async (req, res) => {
  try {
    const memory = await Message.find({ userId: req.user.id })
      .sort({ timestamp: 1 }) // Chronological order
      .select('content sender timestamp') // Limit fields

    console.log('[Memory Fetch]', memory.length, 'messages')
    res.status(200).json({ memory })
  } catch (err) {
    console.error('[Memory Fetch Error]', err)
    res.status(500).json({ message: 'Failed to retrieve memory' })
  }
})


export default router
