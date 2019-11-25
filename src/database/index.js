const mongoose = require('mongoose')

mongoose.connect('mongoosedb://localhost/noerest', { useMongoClient: true })
mongoose.Promise = global.Promise

module.exports = mongoose
