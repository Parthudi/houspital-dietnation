const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const Filter  = require('bad-words')
const {generateMessage, generateLocationMessage} = require('./utils/messages')
const {addUser, removeUser, getUser,  getUsersInRoom} = require('./utils/users')
require('./db/mongoose')
const morgon = require('morgan')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = socketio(server) 

const port = process.env.PORT || 4000 

//route
const userRoute = require('./routes/userroutes')
const dietChartRoute = require('./routes/dietchartroutes')

const publicDirectoryPath = path.join(__dirname, '../public') 

app.use(express.static(publicDirectoryPath))

app.use(express.json())
app.use(morgon('dev'))
app.use(cors())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin' , '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization' );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
})

app.use(userRoute)
app.use(dietChartRoute)


io.on('connection', (socket) => {
    console.log('new connectection')
                                                              //server will send this data to client that connected/
   
     socket.on('join', ({username, room}, callback )=> {
            
            const {error, user} = addUser({ id: socket.id, username, room})
            
            if(error) {
                     return callback(error)
            }
            socket.join(user.room)

            socket.emit('message', generateMessage('Admin', 'Welcome'))
    
             socket.broadcast.to(user.room).emit('message', generateMessage(user.username, user.username+ ' has joined!!') )

             io.to(user.room).emit('roomData', {
                     room: user.room,
                     user : getUsersInRoom(user.room)
             })
             callback()
    })

//listener for sending message 
    socket.on('SendMessage', (finalmessage, callback) => {

            const user = getUser(socket.id) 

            const filter = new Filter()

            if(filter.isProfane(finalmessage)){
                  return  callback('bad-words not allowed')
            }

            io.to(user.room).emit('message', generateMessage(user.username, finalmessage))
            callback()
    })  
//listener for sending location        
    socket.on('SendLocation', (objcapture, callback) => {

       const user = getUser(socket.id)

       io.to(user.room).emit('locationMessage',  generateLocationMessage( user.username, 'https://google.com/maps?q='+objcapture.latitude+','+objcapture.longitude))
       callback('location delivered !!!')
    })

//listener for disconnecting
            socket.on('disconnect', () => {
                    const user = removeUser(socket.id)
    
                    if(user) {                               
                        {
                            io.to(user.room).emit('message', generateMessage('Admin', user.username+ ' had left the chat'))
    
                            io.to(user.room).emit('roomData', {
                                    room: user.room,
                                    user : getUsersInRoom(user.room)
                                 })
                            }                    
                    }
             })
})

server.listen( port, () => {
    console.log('server is running on ' +port)
})