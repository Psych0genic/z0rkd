import mongoose from 'mongoose';
const messageSchema = new mongoose.Schema({
  userId: String,
  content: String,
  sender: { type: String, enum: ['user', 'ai'], default: 'user' },
  timestamp: { type: Date, default: Date.now },
});
export default mongoose.model('Message', messageSchema);
