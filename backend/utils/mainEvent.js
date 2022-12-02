import { createBots } from './bot.js'

let timeLeft = 0
let usersService = null
let diseasesService = null

export function act(uService, dService) {
    usersService = uService
    diseasesService = dService
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
    usersService.deleteBotUsers()
    usersService.resetAllUsers()
    createBots(usersService, diseasesService, 30)
}

function tickTimeLeft() {
    timeLeft--
    if (timeLeft <= 0) {
        greatReset()
        setTimeLeft(process.env.SESSION_DURATION)
    }
}