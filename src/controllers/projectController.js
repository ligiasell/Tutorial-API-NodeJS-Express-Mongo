const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  router.send({ ok: true })
})

module.exports = app => app.use('//projects', router)
