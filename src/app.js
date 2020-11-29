const express = require('express')
require('../src/db/mongoose')
const router = require('./routes/userroutes')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(express.json())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})
app.use(router)


const port = 4000

app.listen(port, () => {
    console.log('server is running on ' +port)
})