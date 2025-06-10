import User from '../models/User.js'
import jwt from 'jsonwebtoken'

// JWT creation helper
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '3d' })
}

// Register Controller
export const registerController = async (req, res) => {
  const { username, email, password } = req.body
  console.log('[Register Attempt]', req.body)

  try {
    const user = await User.create({ username, email, password })
    const token = createToken(user._id)
    res.status(201).json({ token })
  } catch (err) {
    console.error('[Register Error]', err.message)
    res.status(400).json({ message: err.message })
  }
}

// Login Controller
export const loginController = async (req, res) => {
  const { username, password } = req.body
  console.log('[Login Attempt]', req.body)

  try {
    const user = await User.login(username, password)
    const token = createToken(user._id)
    res.status(200).json({ token })
  } catch (err) {
    console.error('[Login Error]', err.message)
    res.status(400).json({ message: err.message })
  }
}
