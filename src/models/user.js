const mongoose = require('../database')
const bcrypt = require('bcryptjs')

// Fields inside the database
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
})

UserSchema.pre('save', async function(next) {
  // 10 is how many rounds the hash will be spinned
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
