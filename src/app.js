const express = require('express')
require('./db/mongoose')
const morgon = require('morgan')
// const cors = require('cors')
const app = express()

//route
const userRoute = require('./routes/userroutes')
const dietChartRoute = require('./routes/dietchartroutes')

app.use(express.json())
app.use(morgon('dev'))
// app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use(userRoute)
app.use(dietChartRoute)

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log('server is running on ' +port)
})