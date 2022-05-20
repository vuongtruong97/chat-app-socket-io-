const users = []

//addUser,removeUser,getUser,getUserInRoom

const addUser = ({ id, username, room }) => {
    //Clean data

    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    //validate data
    if (!username || !room) {
        return { error: 'Username and room are require' }
    }

    //check for existing user

    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })
    // validate username
    if (existingUser) {
        return {
            error: 'Username is in use!',
        }
    }
    // Store user
    const user = {
        id,
        username,
        room,
    }
    users.push(user)
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id)
    if (index !== -1) {
        const user = users.splice(index, 1)[0]
        return user
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUserInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => {
        return user.room === room
    })
}

module.exports = {
    addUser,
    getUser,
    removeUser,
    getUserInRoom,
}
console.log(users)
