import { ObjectId } from "mongodb"
import User from "../model/Notif.js"

export default class NotifsService {
    constructor(database, userService, eventsService) {
        this.database = database
        this.notifsCollection = database.collection('notifs')
        this.usersCollection = database.collection('users')
        this.userService = userService
        this.eventsService = eventsService
    }

    async askToF(username, person) {
        const user = await this.userService.getUserByName(username)
        const newNotif = new Notif("Baiser ?", EnumNotifTypes.wantToF, "Veux-tu baiser avec moi ?", 1, {idPersonA:user._id,isProtected:person.protected})
        this.createNotifForOneUser(person.idPerson, newNotif)
        return newNotif
    }

    async respondToF(username, person) {
        const user = await that.usersService.getUserByName(username)
        let currentNotif = await that.notifsService.getNotifByID(person.idNotif)
        if(currentNotif == null) {
            return false
        }
        await this.deleteNotifByID(currentNotif._id.toString())
        const newEvent = new Event(currentNotif.data.idPersonA, user._id, currentNotif.isProtected, [])
        await this.eventsService.createEventForBothUsers(newEvent)
        return true
    }

    async createNotif(notif) {
        let result = await this.notifsCollection.insertOne(notif);
        return result
    }

    async createNotifForOneUser(userID, notif) {
        await this.createNotif(notif);
        await this.userService.addNotifID(userID, notif._id)
    }

    async getNotifByID(notifId){
        const queryNotif = {_id: new ObjectId(notifId)}
        const optionNotif = {}
        let resultNotif = await this.notifsCollection.findOne(queryNotif, optionNotif)
        return resultNotif
    }

    async deleteNotifByID(notifId){
        const query = {_id: new ObjectId(notifId)}
        const option = {}
        let result = await this.notifsCollection.deleteOne(query);
        return result
    }

    async getNotifsByIDUser(idUser, isRead) {
        let user = await this.userService.getUserByID(idUser)
        if(user !== null){
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
        return null
    }

    async readNotif(idNotif){
        const filter = { _id: new ObjectId(idNotif) };
        const update = {
            $set:{
                isRead: true
            }
        }
        const options = { upsert: true };
        const result = await this.notifsCollection.updateOne(filter, update, options);
        return result
    }

    async readAllNotifs(idUser){
        let unreadNotifs = await this.getNotifsByIDUser(idUser, false)
        if(unreadNotifs !== null){
            for(let i = 0; i < unreadNotifs.length; i++){
                this.readNotif(unreadNotifs[i]._id.toString())
            }
        }
    }
}