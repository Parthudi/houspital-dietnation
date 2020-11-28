const express = require('express')
require('../src/db/mongoose')
const router = require('./routes/userroutes')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(router)
app.use(cors({origin:'http://localhost:3000'}))

const port = 4000

app.listen(port, () => {
    console.log('server is running on ' +port)
})