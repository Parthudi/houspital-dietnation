const User = require('../model/usermodel')
const log4js = require("log4js")
const logger = log4js.getLogger()
logger.level = "debug"
const sharp = require('sharp')
const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')

exports.Findbyid =  async (req, res, next, id) => {
    const user = await User.findById(id)

    if(!user) {
        throw new Error('user not found')
    }
    req.profile = user
    next()
}

exports.Signup = async(req, res) => {
    try{  
        let me = new User(req.body) 
        
     if(req.body.password === req.body.confirmPassword) {
        
        let buffer = await sharp(req.file.buffer).resize({height:300, width:260}).png().toBuffer()
        me.profilepic = buffer
    
        const user = await me.save()
        logger.debug('user sucessfully signedin! ')
        res.status(201).send({user})
        }
        else {
            logger.error('Password didnt matched')
            throw new Error('password didnt match')
          }
      
    } catch(error) {
        logger.error('user enable to signup')
        if(!req.body.userName) {
            res.status(401).json({error: 'Please enter Name'})
        }
        if( 5>req.body.name.length || req.body.name.length>20) {
            res.status(401).json({error: "Name must be 6 to 20 digits"})
        }
        if(!req.body.email) {
            res.status(401).json({error: 'Please enter Email'})
        }
        if(!req.body.password) {
            res.status(401).json({error: 'Please enter Password'})
        }       
        if(req.body.password.length < 6) {
            res.status(401).json({error: 'Password Should be Strong'})
        }
        else{
            res.status(401).json({error: "Fill the details Correctly"})
        }
    }
}

//    /user/login
exports.Login = async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateToken()

        res.status(200).send({user, token})
        } catch(error) {
            if(!req.body.email) {
                res.status(401).json({error: 'Please enter Email'})
            }
            if(!req.body.password) {
                res.status(401).json({error: 'Please enter Password'})
            }       
            if(req.body.password.length < 6) {
                res.status(401).json({error: 'Password Should be Strong'})
            }
            else{
                res.status(401).json({error: "Fill the correct details only! "})
            }
        }  
}

exports.Read = async(req, res) => {
    try{
            const user = await req.user

            res.status(201).send(user)
    } catch(error) {
        res.status(401).send(error)
    }
   
}

exports.Updateuser = async(req, res) => {
    const allowedupdates = ['userName' , 'city' , 'email', 'gender', 'phoneNumber']
    const keyvalues = Object.keys(req.body)
    const validaton = keyvalues.every((value)=> {
        return allowedupdates.includes(value)
    })
    if(!validaton) {
        res.status(404).send('input invalid')
    }
try{
     const user = await req.user
      //  const user = await User.findByIdAndUpdate( _id , req.body , { new: true, runValidators: true })
    keyvalues.forEach((update) =>  user[update] = req.body[update])
    
    await user.save()

   res.status(202).send(user)

    } catch(error) {
        res.status(404).send(error)
    }
    
}

exports.update = async(req, res) => {
    try{
        let form = new formidable.IncomingForm()
        form.keepExtensions = true
        form.parse(req, (err, fields, files) => {
            if(err) {
              return res.status(400).json({
                error: 'Image could not be uploaded'
                })
            }

        const {userName, email, password, confirmPassword, phoneNumber, gender,city, profilepic} = fields
        console.log('user : ' +req.user)
         let user = req.user
         user = _.extend(user, fields)
     
        if(fields.role) {
            return res.status(400).json({
                error: 'User Role cannot be changed'
                })
        }
       
        if(files.profilepic) {
            user.profilepic = fs.readFileSync(files.profilepic.path)
        }
        console.log('user before saving: ')
        user.save()
        res.status(202).send(user)
            })
        } catch(error) {
                res.status(404).send({ error : "Update Invalid"})
                }
        }

exports.Logoutuser = async (req, res) => {
    try{      
        req.user.tokense = req.user.tokense.filter((token) => {
        //    console.log('token : ' +token.token) //all token
        //    console.log('reque : ' +req.token)      //latest token
            return console.log(token.token !==  req.token)  //filter/remove token which matches
        })
        await req.user.save()
        res.status(201).json({message: 'SignOut Sucessfull' })
        
    }catch(error){
        res.status(401).send({error : 'logout problem'})
    }
}

exports.bmiDetails = async(req, res) => {
    try{
        let user = req.profile
    
        console.log(req.body)
        
        user.bmi = req.body.BMI
        await user.save()
        res.status(200).send()

} catch(error) {
        res.status(400).send({error: error.message})
      }
}

exports.Remove = async(req, res) => {
    try{
        await req.user.remove()
        
        res.send(req.user)
    }catch(error) {
        res.status(404).send('error occured')
    }   
}

exports.Profile = async(req, res) => {
    try{
        if(req.profile.profilepic) {
            return res.status(201).send(req.profile.profilepic)
          }
            next()
    }catch(error){
        res.status(404).send('profilepic not available')
    }
}