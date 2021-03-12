const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema

const dietChartSchema = new mongoose.Schema({
    photo: {
        type: Buffer,
        default: ''    
      },
    name:{
        type: String,
        required: true,
        default: ''
    },
    morning: {
        type: String,
        default: "Dont Consume Anything" 
    },
    breakfast: {
        type: String,
        required: true,
        default: ''
    },
    midmeal: {
        type:String,
        default: "Dont Consume Anything"
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    lunch: {
        type: String,
        required: true,
        default: ''
    },
    eveningsnacks: {
        type: String,
        default: "Dont Consume Anything"  
    },
    dinner: {
        type: String,
        required: true,
        default: ''
    },
    beforebed: {
        type: String,
        default: "Dont Consume Anything"                               
      },
     },
    {
        timestamps: true
       })


    dietChartSchema.methods.toJSON = function() {  
        const user = this
    
        const userObject = user.toObject()

         delete userObject.photo
        
        return userObject
    }

const DietChart = mongoose.model('dietChart', dietChartSchema)

module.exports = DietChart