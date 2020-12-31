const jwt = require('jsonwebtoken')
const User = require('../model/userModel')
const log4js = require("log4js")

var logger = log4js.getLogger()
logger.level = "debug"


//checking the user is valid user or not by matching the token & giving permission to perform task on if the user is authenticated.
const auth = async(req, res, next) => {
    try{console.log('checking for auth')
        const token  = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decode = jwt.verify(token, process.env.JWTSECRET)
        const user   = await User.findOne({_id: decode._id, 'tokense.token': token })
        
        if(!user) {
            throw new Error()
          }
        logger.debug('Authenticated')

        req.token = token    
        req.user  = user
        next()
    } catch(error) {
        logger.error("Authentication failed")
      
        res.status(401).send('error : please authenticate. ')
    }
   
}

const isAuth = async(req, res, next) => {
    try {
    console.log('url id:  '+ req.profile._id.toString())  //id in url
    console.log('logged in user:  ' + req.user._id.toString())     //id in login
    //if letters are numeric aswell as string use toString() so we can compare them or do anyting.
     let useMe = req.profile && req.user && req.profile._id.toString() == req.user._id.toString()
   
    if( (!useMe)) {
        throw new Error('You Cant See Me')
        }
        logger.debug('is Auth done')
        
        next()
    } catch(error) {
            res.status(403).send('False profile')
        }
    
}

const isAdmin = (req, res, next) => {
    if(req.user.role === 'user') {
        
        throw new Error( 'Admin Resource Access denied!!' )
    }
    console.log('isAdmin done')
    next()
}



module.exports = {
    auth,
    isAdmin,
    isAuth
} 