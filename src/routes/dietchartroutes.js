const express = require('express')
const {dietChart, getdietChart,getDietPic,uploadDietPic,deleteDiet, findDietId} = require('../controllers/dietchartController')
const route = new express.Router()
const {auth, isAdmin, isAuth} = require('../middleware/auth')
const {Findbyid} = require('../controllers/userController') 
const multer  = require('multer')

const upload = multer({
    limits: {
        fileSize: 4000000       //2mb
    }, 
    fileFilter(req, file, callback) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            throw new Error('File not Supported')
        }
        callback(undefined, file)
    }
})

//Routes
route.param('userid', Findbyid)
route.param('dietid', findDietId)
route.post('/user/creatediet/:userid',auth, isAuth, isAdmin, upload.single('photo'), dietChart) 
route.get('/user/getdiet/:userid',auth, isAuth, getdietChart)
route.post('/user/photo/:userid/:dietid',auth, isAuth, isAdmin, upload.single('photo') , uploadDietPic)
route.delete('/user/deletediet/:dietid', auth, isAuth, isAdmin, deleteDiet)
route.get('/user/dietpic/:userid', getDietPic)

module.exports = route