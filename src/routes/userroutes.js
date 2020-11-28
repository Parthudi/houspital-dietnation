const express = require('express')
const User = require('../model/usermodel')
const log4js = require("log4js")
const  multer = require('multer')
const sharp = require('sharp')
const router = new express.Router()

const logger = log4js.getLogger()
logger.level = "debug"

//CREATE USER
router.post('/user/signup', async (req, res) => {
    try{
            const me = new User(req.body)
            await me.save()
            
         if(req.body.password === req.body.confirmPassword) {
            logger.debug('user sucessfully signedin! ')
            res.status(201).send({me})
            }
            else {
                logger.error('Password didnt matched')
                throw new Error('password didnt match')
              }
    } catch(error) {
        logger.error('user enable to signup')
        res.status(400).send(error)
    }
})

//READ USER
router.get('/user/read' , async(req, res) => {
    try{
        const user = await User.find({} , function(err, result) {
            if (err) {
              console.log(err);
            } else {
              res.json(result);
            }
        })
        res.send({user})
        } catch(error) {
            console.log(error)
                res.status(400).send('error occured')
        }
   
})


router.post('/user/login' , async(req, res) => {
    try{
        const user = await User.findByCredential(req.body.email , req.body.password)

        res.send({user})
        } catch(error) {
            console.log(error)
                res.status(400).send('error occured')
        }
   
})

//UPDATE USER
router.patch('/user/:me' ,async(req, res) => {
    const allowedupdates = ['username' , 'age' , 'email', 'password',  'city', 'mobile', ' avatar' ]
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
        })

//DELETE USER
router.delete('/user/:me', async(req, res) => {
        try{
            await req.user.remove()
            
            res.send(req.user)
        }catch(error) {
            res.status(404).send('error occured')
        }
       
    })
    

const upload = multer({
        dest: 'images',
        limits: {
            fileSize : 10000000
        },
        fileFilter(req, file, cb) {
            if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
               return  cb(new Error('file not supported'))
              }
            cb(undefined, true)
        }
    })

router.post('/user/me/image', upload.single('upload') , async function(req,res)  {
    try{
         const buffer = await sharp(req.file.buffer).resize({height: 250, width:250}).png().toBuffer()
         console.log("converted")
    
         req.user.avatar = buffer 
    
         await req.user.save()

        res.status(201).send('Image uploaded')

    } catch(error)  {
        res.status(400).send({ error: error.message})
    }
 })

module.exports = router