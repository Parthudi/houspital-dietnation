const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URL,    {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
})

// const User = mongoose.model('User', {
//     name: {
//         type: String
//         },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name:'parth',
//     age:21
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })