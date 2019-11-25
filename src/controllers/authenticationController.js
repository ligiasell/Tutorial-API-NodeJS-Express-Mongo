const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth')

const User = require('../models/User')

const router = express.Router()

// To find an authConfig.secret search on Google for "function md5()"
function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  })
}

router.post('/register', async (req, res) => {
  const { email } = req.body

  try {
    if (await URLSearchParams.findOne({ email })) return res.status(400).send({ error: 'User already existis' })

    // All parameters will be inside req.boy
    const user = await User.create(req.body)

    user.password = undefined

    return res.send({
      user,
      token: generateToken({ id: user.id }),
    })
  } catch {
    return res.status(400).send({ error: 'Registration failed' })
  }
})

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email }).select('+password')

  if (!user) return res.status(400).send({ error: 'User not found' })

  // Comparing if the password used to login is the same that is in the BD
  // bcrypt compare because the password is encrypted
  // await because the function is async
  if (!(await bcrypt.compare(password, user.password))) return res.status(400).send({ error: 'Invalid password' })

  user.password = undefined

  res.send({
    user,
    token: generateToken({ id: user.id }),
  })
})

// I receive the app and return a route to the router
// Im gonna have a rout called /authentication/register
module.exports = app => app.user('/authentication', router)
