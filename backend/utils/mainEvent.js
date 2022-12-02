timeLeft = 0

export function act() {
    setTimeLeft(process.env.SESSION_DURATION)
    setInterval(tickTimeLeft, 1000)
}

export function getTimeLeft() {
    return timeLeft
}

function setTimeLeft(t) {
    timeLeft = t
}

function greatReset(usersService) {
    usersService.setLastSession()
    usersService.resetAllUsers()
}

function tickTimeLeft() {
    timeLeft--
    console.log(timeLeft)
    if (timeLeft <= 0) {
        greatReset()
        setTimeLeft(process.env.SESSION_DURATION)
    }
}