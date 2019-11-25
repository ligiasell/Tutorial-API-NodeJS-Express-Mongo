const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Just to test
// Run "node src/index.js" on terminal
/*
app.get('/', (req, res) => {
  res.send('Ok')
})
*/

// Pass along app to the controller
// App is like an object that is defined just one time, cant create another one
require('./controllers/authenticationController')(app)
require('./controllers/projectController')(app)

app.listen(3000)
