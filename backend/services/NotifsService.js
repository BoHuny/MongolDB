import User from "../model/Notif.js"

export default class NotifsService {
    constructor(database, userService) {
        this.database = database
        this.notifsCollection = database.collection('notifs')
        this.usersCollection = database.collection('users')
        this.userService = userService
    }

    createNotifs(notif) {
        let result = this.notifsCollection.insertOne(notif);
        return result
    }

    async getNotifs(idUser, isRead) {
        let user = this.userService.getUserByID(idUser)
        notifsIds = user.listNotifs
        allNotifs = []
        notifsIds.forEach(idNotif => {
            const queryNotif = {_id: idNotif, isRead: isRead}
            const optionNotif = {}
            allNotifs.push(this.notifsCollection.findOne(queryNotif, optionNotif))
        });
        return allNotifs
    }
}