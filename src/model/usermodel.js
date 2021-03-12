const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const Str = require('@supercharge/strings')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    userName: {
            type: String,
            trim: true,
            default : 'Annonymous'
        },

    email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('email is invalid')
                }
              } 
            },

    password: {
            type: String,
            trim: true,
            required: true,
            minlength: 5,
        validate(value) {
       
       if(value.toLowerCase().includes('password')) {
            throw new Error('password cannot contain password')
            }
                  }
          },

    confirmPassword: {
            type: String,
            required: true,
         },

    phoneNumber: {
            type: Number,
            required: true,
            unique: true,
            validate(value) {
                var rex = new RegExp("^\\d{10}$")
                if(!rex.test(value)) {
                    throw new Error('Please enter valid mobile number')
                        }
                    }
         },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
        },
    gender: {
            type: String,
            enum: ['female', 'male' , 'other'],
        }, 
    city: {
            type: String,
            trim: true,
            required: true
       },
    profilepic: {
               type : Buffer,
               required : true
        },
    bmi: {
        type : Number,
        default: ""
    },
    // otp: [{
    //     string: {
    //         type: String,
    //         required: true
    //      }
    //     }],
    tokense: [{
            token: {
                type: String,
                required: true
            }
          }],
    } , {
        timestamps: true
     })

userSchema.pre('save', async function(next)  {
    const user = this

    if(user.isModified('password')) { 
        user.password = await bcrypt.hash(user.password, 8)
       }
    next()
})

userSchema.methods.toJSON = function() {  
    const user = this

    const userObject = user.toObject()

    delete userObject.profilepic
    
    return userObject
}

userSchema.methods.generateToken = async function()  {
    const user = this
    const secret = process.env.JWTSECRET
    const token = jwt.sign({ _id: user._id.toString() } , secret)

    user.tokense = user.tokense.concat({ token })

    await user.save()
    return token
}

// userSchema.methods.generatestring = async function() {
//     const user = this
//     const string = Str.random(9)

//     user.otp = user.otp.concat({string})

//     await user.save()
   
//     return string
// }
 

userSchema.statics.findByCredentials = async(email, password) => {

    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('unable to find user')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        throw new Error('login failed!!!!')
    }

    return user
}


userSchema.statics.findforget = async(email) => {
    const user = await User.findOne({ email })

    if(!user) {
        throw new Error('unable to find user')
    }
        return user   
}

const User = mongoose.model('User', userSchema)

module.exports = User