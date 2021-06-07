const mongoose = require('mongoose');
const { Schema } = mongoose;

// User Schema

const UserSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8
  },
  timesLoggedIn:{
    type:Number,
    default:0
  },
  date:{
    type:String,
    default:Date.now()
  }
})


const User = mongoose.model('User', UserSchema);
module.exports = User
