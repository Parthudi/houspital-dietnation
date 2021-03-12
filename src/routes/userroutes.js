const express = require('express')
const {Signup, Read, Login, Logoutuser, update, Remove, Profile, Updateuser, bmiDetails, Findbyid} = require('../controllers/userController')
const route = new express.Router()
const {auth, isAdmin, isAuth} = require('../middleware/auth')
const multer  = require('multer')

const upload = multer({     
    limits: {
        fileSize : 3000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return  cb(new Error('file not supported'))
          }  
        cb(undefined, true)
    }
})

//params
route.param('userid', Findbyid)

//Routes
route.post('/user/signup' ,upload.single('profilepic'), Signup)
route.post('/user/login' , Login) 

route.post('/user/logout/:userid', auth, isAuth, Logoutuser)   //always use this logout and login in upper side of routes only
route.get('/user/:userid', auth, isAuth, Read) 
route.patch('/user/update/:userid',auth, isAuth, update) 
route.patch('/user/update/profile/:userid',auth, isAuth, isAdmin, Updateuser)
route.delete('/user/delete/:userid', auth, isAuth, Remove) 
route.post('/user/getbmi/:userid',auth, isAuth, bmiDetails) 
route.get('/user/photo/:userid' , Profile)

module.exports = route


