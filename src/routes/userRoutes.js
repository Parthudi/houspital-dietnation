const express = require('express')
const route = new express.Router()
const {signup, login, logoutuser, findbyid, read, update, remove, uploadimage, removeimage} = require('../controller/userController')
const {auth, isAuth, isAdmin} = require('../middleware/auth')
const  multer = require('multer')

//Routes
route.post('/user/signup' , signup)
route.post('/user/login' , login) 
route.get('/user/logout', auth, logoutuser) 
route.param('userid', findbyid)
route.get('/user/:userid', auth, isAuth, read) 
route.patch('/user/update/:userid', auth, isAuth, update) 
route.delete('/user/delete/:userid', auth, isAuth, remove) 

const upload = multer({ 
    dest: 'images',      
    limits: {
        fileSize : 3000000
    },
    fileFilter(req, file, cb) {
    //     console.log("data: " + file.destination)
    //     console.log('whole file: ' + file)
       console.log('file: ' + file.originalname)
       console.log('mime: ' + file.mimetype)
       console.log('path ' + file.path)
    //    console.log('path: '+ file.stream)
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return  cb(new Error('file not supported'))
            //  throw new Error('File not Supported')
          }
          
        cb(null, true)
    }
})

route.post('/user/profile/upload/:userid',auth,isAuth, upload.single('upload') , uploadimage) 
route.delete('/user/upload/remove/:userid', auth, isAuth, upload.single('upload') , removeimage) 

module.exports = route