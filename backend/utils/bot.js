import fs from 'fs'
import Bot from '../model/Bot.js'
import EnumNotifTypes from '../model/EnumNotifTypes.js'

const data = fs.readFileSync('botNames.txt', 'utf8').split("\r\n")

let nameIndex = 0

export function getRandomName() {
    return data[nameIndex++]
}

export async function createBots(userService, diseasesService, nBots) {
    let allDiseases = await diseasesService.getDiseases()
    for (let i = 0; i < nBots; i++) {
        let bot = new Bot(allDiseases)
        userService.createUser(bot.user)
    }
}

export async function botAct(userService, notifsService) {
    const users = await userService.getUsers()
    for (let i = 0; i < users.length; i++) {
        let user = users[i]
        if (!user.isHuman) {
            let r = Math.floor(Math.random() * (users.length - 1))
            if (r === i) {
                r++;
            }
            let otherUser = users[r]
            await notifsService.askToF(user.pseudo,{idPerson:otherUser._id.toString(),protected:(Math.random() > 0.3)})
            let allNotifs = await notifsService.getNotifsByIDUser(user._id, false)
            for(let notifIndex = 0; notifIndex < allNotifs.length; notifIndex++){
                let notif = allNotifs[notifIndex]
                if(notif.type === EnumNotifTypes.wantToF){
                    notifsService.respondToF(user.pseudo,{idNotif:notif._id,response:(Math.random() > 0.1)})
                }
            }
        }
    }
}