const User = require('../model/userModel')
const sharp = require('sharp')
const log4js = require("log4js")

var logger = log4js.getLogger()
logger.level = "debug"

exports.findbyid =  async (req, res, next, id) => {
    const user = await User.findById(id)

    if(!user) {
        throw new Error('user not found')
    }
    req.profile = user
    next()
}

exports.signup = async (req, res) => {
    try{
        const user = new User(req.body)
    
        if(req.body.password === req.body.confirmPassword) {
            await user.save()

            const token = await user.generateToken()
    
            res.status(201).send({user, token})
         } else{
             throw new Error('password didnt match')
            }

      }catch(error){
          res.status(401).send(error.message)
      }
} 

exports.login = async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateToken()

        res.status(200).send({user, token})
    }catch(error) {
        res.status(401).send('user invalid')
    }
}

exports.read = async(req, res) => {
    try{
            const user = await req.user

            res.status(201).send(user)
    } catch(error) {
        res.status(401).send(error)
    }  
}

exports.logoutuser = async (req, res) => {
    try{      
           req.user.tokense = req.user.tokense.filter((token) => {
        //    console.log('token : ' +token.token) //all token
        //    console.log('reque : ' +req.token)      //latest token
            return  token.token !==  req.token  //filter/remove token which matches
        })
        await req.user.save()
        res.status(201).send('logout successfull')
        
    }catch(error){
        res.status(401).send('logout problem')
    }
}

exports.update = async(req, res) => {
    const allowedupdates = ['userName' , 'email', 'password', 'phoneNumber ', 'city', 'gender', 'upload' ]
    const keyvalues = Object.keys(req.body)

    const validaton = keyvalues.every((value)=> {
            return allowedupdates.includes(value)
        })
    if(!validaton) {
            res.status(404).send('input invalid')
        }

    try{
        const user = await req.user
        keyvalues.forEach((update) =>  user[update] = req.body[update])
    
        await user.save()

        res.status(202).send(user)

        } catch(error) {
                res.status(404).send(error)
                }
        }

exports.remove = async(req, res) => {
        try{
            await req.user.remove()
                
              res.send(req.user)
         }catch(error) {
                res.status(404).send('error occured')
            }
           
        }

exports.uploadimage = async(req, res) => {
    try {
        console.log('controller ' )
        console.log('file path: ' +req.file.path)
        const buffer = await sharp(req.file.path).resize({height: 250, width:250}).png().toBuffer()
        //req.file.path.toBuffer()
        req.user.upload = buffer //this is the modified image
        await req.user.save()
        res.status(201).send('Image uploaded')

    } catch(error) {
        res.status(401).send(error)
    }
}

exports.removeimage = async(req, res) => {
    try{
        req.user.upload = undefined
        await req.user.save()
         res.send('image removed')
    } catch(error) {
        res.status(401).send(error)
    }
}