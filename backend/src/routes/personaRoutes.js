import express from 'express'
import Persona from '../models/Persona.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// Get all personas for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const personas = await Persona.find({ userId: req.user.id }).sort({ createdAt: -1 })
    res.json(personas)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching personas', error: err.message })
  }
})

// Create a new persona
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { name, avatar, description, prompt } = req.body
    const persona = new Persona({
      userId: req.user.id,
      name,
      avatar,
      description,
      prompt
    })
    await persona.save()
    res.status(201).json(persona)
  } catch (err) {
    res.status(400).json({ message: 'Error creating persona', error: err.message })
  }
})

// Update an existing persona
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updated = await Persona.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    )
    if (!updated) return res.status(404).json({ message: 'Persona not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ message: 'Error updating persona', error: err.message })
  }
})

// Delete a persona
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await Persona.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
    if (!deleted) return res.status(404).json({ message: 'Persona not found' })
    res.json({ message: 'Persona deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting persona', error: err.message })
  }
})

export default router
