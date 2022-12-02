import Notif from "../model/Notif.js"
import Event from "../model/Event.js"
import EnumNotifTypes from '../model/EnumNotifTypes.js'
import Route from "./Route.js"


export default class NotifsRoutes {
    constructor(notifsService, eventsService, usersService, diseasesService) {
        this.notifsService = notifsService
        this.eventsService = eventsService
        this.usersService = usersService
        this.diseasesService = diseasesService
    }

    getRoutes() {
        const that = this
        return [
            new Route("askToF", "POST", true, async function (req, res) {
                const frontAskToF = req.body
                const user = await that.usersService.getUserByName(req.user.username)
                const newNotif = new Notif("Baiser ?", EnumNotifTypes.wantToF, "Veux-tu baiser avec moi ?", 1, {idPersonA:user._id,isProtected:frontAskToF.protected})
                that.notifsService.createNotifForOneUser(frontAskToF.idPerson, newNotif)
                return res.status(200).json(newNotif).send()
            }),
            new Route("respondToF", "POST", true, async function (req, res) {
                const frontRespondToF = req.body
                const userB = await that.usersService.getUserByName(req.user.username)
                let currentNotif = await that.notifsService.getNotifByID(frontRespondToF.idNotif)
                if(currentNotif == null){
                    return res.status(400).send()
                }
                if(frontRespondToF.response){
                    let userA = await that.usersService.getUserByID(currentNotif.data.idPersonA)
                    let isProtected = currentNotif.data.isProtected

                    let newDiseasesB = []
                    for (let i = 0; i < userA.listDiseases.length; i++) {
                        let disease = await that.diseasesService.getDiseaseByID(userA.listDiseases[i].diseaseID.toString())
                        let probaTot = 1.
                        if(isProtected){
                            probaTot *= 0.02
                        }
                        probaTot *= disease.probaTransmission
                        if(Math.random() < probaTot){
                            await that.usersService.addDiseaseID(userB._id.toString(), disease._id.toString())
                            newDiseasesB.push(disease._id)
                        }
                    }
                    let newDiseasesA = []
                    for (let i = 0; i < userB.listDiseases.length; i++) {
                        let disease = await that.diseasesService.getDiseaseByID(userB.listDiseases[i].diseaseID.toString())
                        let probaTot = 1.
                        if(isProtected){
                            probaTot *= 0.02
                        }
                        probaTot *= disease.probaTransmission
                        if(Math.random() < probaTot){
                            await that.usersService.addDiseaseID(userA._id.toString(), disease._id.toString())
                            newDiseasesA.push(disease._id)
                        }
                    }

                    const newEvent = new Event(userA._id, userB._id, currentNotif.isProtected, newDiseasesA.concat(newDiseasesB))
                    await that.eventsService.createEventForBothUsers(newEvent)
                }
                await that.notifsService.deleteNotifByID(currentNotif._id.toString())
                await that.usersService.deleteNotifByID(userB._id.toString(), currentNotif._id.toString())
                return res.status(200).send()
            })
        ]
    }
}