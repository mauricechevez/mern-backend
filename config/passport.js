require('dotenv').config();
const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt')

// model, uses index.js by default
const {User} = require('../models/')

// object made of strategy
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.JWT_SECRET
}

const JWT_STRATEGY = new Strategy(options, async (jwtPayload, done)=>{
  // Check for a user by the ID
  try {
    console.log('jwtPayload', jwtPayload)
    const user = await User.findById(jwtPayload.id)
    if (user){
      return done(null, user)
    } else {
      return done (null,false)
    }

  } catch (error) {
    console.log('Error inside of password config')
    console.log('-------------------------------')
    console.log(error)
  }
})

// export a function that will use the strategy
module.exports = async (passport) =>{
  passport.use(JWT_STRATEGY)
}