const generateMessage = (message, user = 'anonymous') => {
    return { message, user, time: new Date().getTime() }
}

const generateLocationMess = (url, user = 'anonymous') => {
    return { url, user, time: new Date().getTime() }
}

module.exports = { generateMessage, generateLocationMess }
