import mongoose from 'mongoose'

const personaSchema = new mongoose.Schema({
  userId: { type: String, required: true },          // Linked to the user who owns this persona
  name: { type: String, required: true },            // Persona name (e.g., "Neo", "Dr. Cortex")
  avatar: { type: String, default: '🧠' },            // Emoji or URL string
  description: { type: String, default: '' },        // Summary of personality or purpose
  prompt: { type: String, required: true },          // Injected into AI prompt chain
  createdAt: { type: Date, default: Date.now }       // When it was created
})

export default mongoose.model('Persona', personaSchema)
