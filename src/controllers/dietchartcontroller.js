const DietChart = require('../model/dietchartmodel')
const log4js = require("log4js")
const logger = log4js.getLogger()
logger.level = "debug"
const sharp = require('sharp')

exports.findDietId = async(req, res,next, id) => {
    try{  
          const diet = await DietChart.findById(id)
          req.diet = diet
          next()
  
    } catch(error) {
      res.status(403).send(error)
    }
  }

exports.dietChart = async(req, res) => {
        try{
                const dietplan = new DietChart(req.body)

                let buffer = await sharp(req.file.buffer).toBuffer()
         
                dietplan.photo = buffer
                 //  req.user.avatar = req.file.buffer
              
                const diet = await dietplan.save()
                res.status(201).send({diet})

        } catch(error) {
            res.status(401).send('Cannot create dietChart')
        }
  }

exports.getdietChart = async(req, res) => {
    try{
        const userBmi = req.profile.bmi     //get user bmi
        console.log("userBMI: " ,userBmi)

        const dietQuery = await DietChart.find({ min : {$lte : userBmi}, max: {$gte : userBmi} });
  
        res.status(201).send(dietQuery)
    } catch(error) {
        res.status(401).send('Cannot get dietChart')
     }
}

exports.uploadDietPic = async(req, res) => {
  try{
  const buffer = await sharp(req.file.buffer).toBuffer()
        req.diet.photo = buffer //this is the modified image
        await req.diet.save()
      res.send('Image uploaded successfully')
    } catch(error) {
      res.status(400).send({ error: error.message})
     }
  }

exports.deleteDiet = async(req, res) => {
      try{
        const removedDiet = await req.diet.remove()
        res.send({removedDiet})
    }catch(error) {
        res.status(404).send('error occured')
    }  
}

exports.getDietPic = async(req, res, next)  => {
  try{
        console.log("photo")
        const userBmi = req.profile.bmi        
        const dietPic = await DietChart.find({ min : {$lte : userBmi}, max: {$gte : userBmi} });
        console.log(dietPic[0])

          if(dietPic[0]) {
            return res.status(200).send(dietPic[0].photo)
        }
      next()
    }catch(error){
        res.status(404).send('profilepic not available')
    }
}