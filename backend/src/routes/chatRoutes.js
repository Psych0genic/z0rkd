import express from 'express'
import Message from '../models/Message.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import fetch from 'node-fetch'

const router = express.Router()

// Static fallback prompt
const defaultSystemPrompt = `You are a helpful, slightly glitchy AI assistant living in a neon-drenched cyberpunk world. You reply with insight and style.`

// Get chat history for the logged-in user
router.get('/history', authMiddleware, async (req, res) => {
  const history = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 })
  res.json({ history })
})

// Send a message and get an AI response
router.post('/send', authMiddleware, async (req, res) => {
  try {
    const { message, personaId } = req.body
    if (!message || typeof message !== 'string' || message.trim() === '') {
      return res.status(400).json({ message: 'Invalid message' })
    }

    let personaName = ''
    if (personaId) {
      const Persona = (await import('../models/Persona.js')).default
      const persona = await Persona.findById(personaId)
      if (persona) {
        personaName = persona.name
      }
    }

    // Save user message
    const userMsg = new Message({
      userId: req.user.id,
      content: message,
      sender: 'user',
      personaId,
      personaName
    })
    await userMsg.save()

    // Fetch history
    const history = await Message.find({ userId: req.user.id }).sort({ timestamp: 1 })
    const formattedHistory = history
      .map(m => `${m.sender === 'user' ? 'User' : 'AI'}: ${m.content}`)
      .join('\n')

    const fullPrompt = `${personaName ? `${personaName} persona:\n` : ''}${defaultSystemPrompt}\n\n${formattedHistory}\nUser: ${message}\nAI:`

    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3',
        prompt: fullPrompt,
        stream: false
      })
    })

    const data = await response.json()
    const aiResponse = data.response?.trim() || '...'

    // Save AI message
    const aiMsg = new Message({
      userId: req.user.id,
      content: aiResponse,
      sender: 'ai',
      personaId,
      personaName
    })
    await aiMsg.save()

    res.json({ response: aiResponse })
  } catch (err) {
    console.error('Error in /send:', err)
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})


export default router
