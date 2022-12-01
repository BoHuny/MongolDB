import User from "../model/Notif.js"

export default class NotifsService {
    constructor(client) {
        this.client = client
        this.notifsCollection = client.collection('notifs')
        this.usersCollection = client.collection('users')
    }

    createNotifs(notif) {
        let result = this.notifsCollection.insertOne(notif);
        return result
    }

    async getNotifs(idUser, isRead) {
        const queryUser = { _id: idUser}
        const optionUser = {}
        let user = await this.usersCollection.findOne(queryUser, optionUser);
        notifsIds = user.listNotifs
        allNotifs = []
        notifsIds.forEach(idNotif => {
            const queryNotif = {_id: idNotif}
            const optionNotif = {}
            allNotifs.push(this.notifsCollection.findOne(queryNotif, optionNotif))
        });
        return allNotifs
    }
}