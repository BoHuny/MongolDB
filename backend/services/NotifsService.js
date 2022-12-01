import User from "../model/Notif.js"

export default class NotifsService {
    constructor(client) {
        this.client = client
        this.notifsCollection = client.collection('notifs');
    }

    createNotifs(notif) {
        let result = this.notifsCollection.insertOne(notif);
        return result
    }
}