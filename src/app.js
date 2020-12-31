const express = require('express')
require('./db/database')
const morgon = require('morgan')
const route = require('./routes/userRoutes')
const app = express()

app.use(express.json())
app.use(morgon('dev'))

//cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use(route)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('server is running on ' +port)
})