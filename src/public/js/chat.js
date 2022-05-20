const messForm = document.forms['mess_form']
const messInput = document.querySelector('.mess_input')
const messBtn = document.querySelector('.mess_send')
const messBox = document.querySelector('.message')
const userEmail = document.querySelector('.user')
const shareLocation = document.querySelector('#share_location_btn')
const sideBar = document.querySelector('.sidebar')
const sideBarTemp = document.querySelector('#sidebar_template').innerHTML
const scrollBottomBtn = document.querySelector('.scroll_bottom')
const roomName = document.querySelector('.room_name')
const socket = io()

//get value from url query string
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })
roomName.innerText = room

const autoScrool = () => {
    //new message element
    const newMessage = messBox.lastElementChild

    // height of the new message
    const newMessageStyle = getComputedStyle(newMessage)
    const newMessageMargin = parseInt(newMessageStyle.marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin // 68 104 176 ...

    //visible height => messBox height
    const visibleHeight = messBox.offsetHeight
    //scrool height => messBox content height
    const containerHeight = messBox.scrollHeight

    // how far have i scrolled => content hidden + messBox height
    const scrollOffset = messBox.scrollTop + visibleHeight

    if (containerHeight - newMessageHeight <= scrollOffset) {
        messBox.scrollTop = messBox.scrollHeight
    }
}

const scrollBottom = () => {}

messBox.addEventListener('scroll', () => {
    const newMessage = messBox.lastElementChild
    if (messBox.scrollTop + newMessage.offsetHeight < messBox.scrollHeight - messBox.offsetHeight) {
        if (scrollBottomBtn.classList.contains('show')) {
            return
        }
        scrollBottomBtn.classList.add('show')
    } else if (scrollBottomBtn.classList.contains('show')) {
        scrollBottomBtn.classList.remove('show')
    }
})

scrollBottomBtn.addEventListener('click', () => {
    messBox.scrollTop = messBox.scrollHeight
})

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error)
        return (location.href = '/')
    }
})

socket.on('room data', (data) => {
    const html = Mustache.render(sideBarTemp, { users: data.users, room: data.room })
    sideBar.innerHTML = html
})

socket.on('wellcome', (message, callback) => {
    const wellcome = document.createElement('span')
    wellcome.classList.add('nofification')
    wellcome.innerHTML = `${message.message}`
    messBox.appendChild(wellcome)
    callback('delivered wellcome')
})
socket.on('notification', (notification) => {
    const wellcome = document.createElement('span')
    wellcome.classList.add('nofification')
    wellcome.innerHTML = `${notification.message}`
    messBox.appendChild(wellcome)
    wellcome.scrollIntoView()
})

socket.on('chat message', (mess) => {
    const item = document.createElement('div')
    item.classList.add('message_info')
    item.innerHTML = `<div class='message_owner'><span class='owner_name'>${mess.user}(${moment(mess.createAt).format('LT')})</span></div><div class='chat_text'>${mess.message}</div>`
    messBox.appendChild(item)

    messBtn.removeAttribute('disabled')
    autoScrool()
    // item.scrollIntoView()
})

socket.on('share location', (mess) => {
    const item = document.createElement('div')
    item.classList.add('message_info')
    item.innerHTML = `<div class='message_owner'><span class='owner_name'>${mess.user}(${moment(mess.createAt).format('LTS')})</span></div><div class='chat_text'>${mess.url}</div>`
    messBox.appendChild(item)

    messBtn.removeAttribute('disabled')
    item.scrollIntoView()
})

messForm.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        e.preventDefault()
        if (messInput.value.trim().length > 0) {
            messBtn.setAttribute('disabled', 'disabled')
            socket.emit('chat message', messInput.value, (sendback) => {
                messInput.value = ''
                messInput.focus()
            })
        }
    }
})

messBtn.addEventListener('click', (e) => {
    // e.preventDefault()
    if (messInput.value.trim().length > 0) {
        messBtn.setAttribute('disabled', 'disabled')
        socket.emit('chat message', messInput.value.toString(), (sendback) => {
            messInput.value = ''
            messInput.focus()
        })
    }
})

shareLocation.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert("Your browser doesn't support geolocation")
    }
    shareLocation.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('share location', `<a href="https://google.com/maps?q=${position.coords.latitude},${position.coords.longitude}" target="_blank">${username} location</a>`, (message) => {
            shareLocation.removeAttribute('disabled')
        })
    })
})
