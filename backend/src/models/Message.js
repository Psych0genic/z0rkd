import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  userId: String,
  content: String,
  sender: { type: String, enum: ['user', 'ai'], default: 'user' },
  timestamp: { type: Date, default: Date.now },
  personaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Persona', default: null },
  personaName: { type: String, default: '' }
});
export default mongoose.model('Message', messageSchema);
