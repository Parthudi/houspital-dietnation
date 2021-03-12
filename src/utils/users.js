//addUser, removeUser, getUser, getUsersInRoom
const users = []

//clean the data
const addUser = ({ id , username , room}) => {
    username = username.trim().toLowerCase()
    room     = room.trim().toLowerCase()

//valid the data
    if( !username || !room) {
        return {
            error : 'username/room cannot be empty'
        }
    }

//check the existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if(existingUser) {
        return {
            error: 'Username Already Exist Use Different UserName'
        }
    }

//store user
    const moreUser = users.find((user) => {
        return user.room === room && users.length >=3
    })

    if(moreUser) {
        return {
            error: 'Doctor is busy With another Customer!! Please Come Back Later'
        }
    }

const user = {id, username, room}
            users.push(user)
            return{ user }
     
 }
 
const removeUser = (id) => {
    const index = users.findIndex((user) =>  user.id === id)

        if(index !== -1) {
             return users.splice(index, 1)[0]
        }
}

const getUser = (id) => {
    return users.find((user) => user.id === id )

}

const getUsersInRoom = (room) => {

    room = room.toLowerCase().trim()
    return users.filter((user) =>   user.room === room)
    }


module.exports = {
    addUser, 
    removeUser, 
    getUser, 
    getUsersInRoom
}