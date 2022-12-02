import fs from 'fs'
import Bot from '../model/Bot.js'

const data = fs.readFileSync('botNames.txt', 'utf8').split("\r\n")


export function getRandomName() {
    return data[Math.floor(Math.random() * data.length)]
}

export function createBots(userService, nBots) {
    for (let i = 0; i < nBots; i++) {
        let bot = new Bot()
        userService.createUser(bot.user)
    }
}

export function botAct(userService) {
    const users = userService.getUsers()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (!user.isHuman) {
            let r = Math.floor(Math.random() * users.length) - 1
            if (r === i) {
                r++;
            }

        }
    }
}