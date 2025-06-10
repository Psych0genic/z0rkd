import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar:   { type: String, default: '' }, // base64 image string or URL
  initials: { type: String, default: '' },
})


// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

// Custom login method
userSchema.statics.login = async function (identifier, password) {
  const user = await this.findOne({
    $or: [{ email: identifier }, { username: identifier }]
  })
  if (!user) throw Error('User not found')

  const match = await bcrypt.compare(password, user.password)
  if (!match) throw Error('Incorrect password')

  return user
}


const User = mongoose.model('User', userSchema)

export default User
