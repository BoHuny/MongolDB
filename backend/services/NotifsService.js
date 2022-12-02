import { ObjectId } from "mongodb"
import Notif from "../model/Notif.js"
import Event from "../model/Event.js"
import EnumNotifTypes from "../model/EnumNotifTypes.js"

export default class NotifsService {
    constructor(database, usersService, eventsService, diseasesService) {
        this.database = database
        this.notifsCollection = database.collection('notifs')
        this.usersCollection = database.collection('users')
        this.usersService = usersService
        this.diseasesService = diseasesService
        this.eventsService = eventsService
    }

    async askToF(username, person) {
        const user = await this.usersService.getUserByName(username)
        const newNotif = new Notif("Baiser ?", EnumNotifTypes.wantToF, "Veux-tu baiser avec moi ?", 1, {idPersonA:user._id,pseudo:user.pseudo,isProtected:person.protected})
        this.createNotifForOneUser(person.idPerson, newNotif)
        return newNotif
    }

    async respondToF(username, person) {
        const userB = await this.usersService.getUserByName(username)
        let currentNotif = await this.getNotifByID(person.idNotif)
        if(currentNotif == null) {
            return false
        }

        if(person.response){
            let userA = await this.usersService.getUserByID(currentNotif.data.idPersonA)
            let isProtected = currentNotif.data.isProtected

            let newDiseasesB = []
            for (let i = 0; i < userA.listDiseases.length; i++) {
                let disease = await this.diseasesService.getDiseaseByID(userA.listDiseases[i].diseaseID.toString())
                let probaTot = 1.
                if(isProtected){
                    probaTot *= 0.02
                }
                probaTot *= disease.probaTransmission
                if(Math.random() < probaTot){
                    await this.usersService.addDiseaseID(userB._id.toString(), disease._id.toString())
                    newDiseasesB.push(disease._id)
                }
            }
            let newDiseasesA = []
            for (let i = 0; i < userB.listDiseases.length; i++) {
                let disease = await this.diseasesService.getDiseaseByID(userB.listDiseases[i].diseaseID.toString())
                let probaTot = 1.
                if(isProtected){
                    probaTot *= 0.02
                }
                probaTot *= disease.probaTransmission
                if(Math.random() < probaTot){
                    await this.usersService.addDiseaseID(userA._id.toString(), disease._id.toString())
                    newDiseasesA.push(disease._id)
                }
            }

            const newEvent = new Event(userA._id, userB._id, currentNotif.isProtected, newDiseasesA.concat(newDiseasesB))
            await this.eventsService.createEventForBothUsers(newEvent)
        }
        await this.deleteNotifByID(currentNotif._id.toString())
        await this.usersService.deleteNotifByID(userB._id.toString(), currentNotif._id.toString())
        return true
    }

    async createNotif(notif) {
        let result = await this.notifsCollection.insertOne(notif);
        return result
    }

    async createNotifForOneUser(userID, notif) {
        await this.createNotif(notif);
        await this.usersService.addNotifID(userID, notif._id)
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

    async getNotifsByIDUser(idUser, onlyNotRead) {
        let user = await this.usersService.getUserByID(idUser)
        if(user !== null){
            let notifsIds = user.listNotifs
            let allNotifs = []
            for (let i = 0; i < notifsIds.length; i++) {
                let notifId = notifsIds[i]
                let queryNotif = null
                if(onlyNotRead){
                    queryNotif = {_id: notifId, isRead: false}
                } else {
                    queryNotif = {_id: notifId}
                }
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