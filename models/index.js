require('dotenv').config()
const mongoose = require('mongoose')

//Gets rid of warnings when starting up frontend
mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:true,
  useCreateIndex:true
})

const db = mongoose.connection

// Event lets us know connection is open
db.once('open', ()=>{
  console.log(`Connected to MongoDB at ${db.host}:${db.port}`)
})
// If ERROR occurs, print error message
db.on('error', (error)=>{
  console.log(`Database Error`, error)
})

// Import all of your models

const User = require('./User')

// Export all models from this file

module.exports = {
  User
}