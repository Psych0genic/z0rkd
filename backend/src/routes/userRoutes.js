// backend/src/routes/userRoutes.js
import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import User from '../models/User.js'

const router = express.Router()

// Get current user profile
router.get('/profile', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password')
  if (!user) return res.status(404).json({ message: 'User not found' })
  res.json(user)
})

// Update avatar
router.post('/profile/avatar', authMiddleware, async (req, res) => {
  const { avatar } = req.body
  try {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.avatar = avatar
    await user.save()

    res.status(200).json({ message: 'Avatar updated', avatar })
  } catch (err) {
    console.error('[Avatar Upload Error]', err)
    res.status(500).json({ message: 'Failed to update avatar' })
  }
})

export default router
