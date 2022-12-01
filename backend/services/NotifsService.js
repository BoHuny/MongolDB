import User from "../model/Notif.js"

export default class NotifsService {
    constructor(database, userService) {
        this.database = database
        this.notifsCollection = database.collection('notifs')
        this.usersCollection = database.collection('users')
        this.userService = userService
    }

    async createNotif(notif) {
        let result = await this.notifsCollection.insertOne(notif);
        return result
    }

    async createNotifForOneUser(userID, notif) {
        await this.createNotif(notif);
        await this.userService.addNotifID(userID, notif._id)
    }

    async getNotifs(idUser, isRead) {
        let user = await this.userService.getUserByID(idUser)
        let notifsIds = user.listNotifs
        let allNotifs = []
        for (let i = 0; i < notifsIds.length; i++) {
            let notifId = notifsIds[i]
            const queryNotif = {_id: notifId, isRead: isRead}
            const optionNotif = {}
            let resultNotif = await this.notifsCollection.findOne(queryNotif, optionNotif)
            if(resultNotif !== null){
                allNotifs.push(resultNotif)
            }
        }
        return allNotifs
    }
}