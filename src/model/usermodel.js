const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
            type: String,
            unique: true,
            trim: true,
            default : 'Annonymous'
        },

    email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
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
            minlength: 7,
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

    mobile: {
            type: Number,
            unique: true,
            validate(value) {
                var rex = new RegExp("^\\d{10}$")
                if(!rex.test(value)) {
                    throw new Error('Please enter valid mobile number')
                        }
                    }
         }, 

    upload: {
            type: Buffer
        }
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

    delete userObject.password
    delete userObject.confirmPassword
    delete userObject.upload
    
    return userObject
}

userSchema.statics.findByCredential = async(email, password) => {
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

const User = mongoose.model('User', userSchema)

module.exports = User