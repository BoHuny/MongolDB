let timeLeft = 0
let usersService = null

export function act(uService) {
    usersService = uService
    setTimeLeft(process.env.SESSION_DURATION)
    setInterval(tickTimeLeft, 1000)
}

export function getTimeLeft() {
    return timeLeft
}

function setTimeLeft(t) {
    timeLeft = t
}

function greatReset() {
    usersService.setLastSession()
    usersService.resetAllUsers()
    usersService.getLastSession()
}

function tickTimeLeft() {
    timeLeft--
    if (timeLeft <= 0) {
        greatReset()
        setTimeLeft(process.env.SESSION_DURATION)
    }
}