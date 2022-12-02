import Notif from "../model/Notif.js"
import Event from "../model/Event.js"
import EnumNotifTypes from '../model/EnumNotifTypes.js'
import Route from "./Route.js"


export default class NotifsRoutes {
    constructor(notifsService, eventsService, usersService) {
        this.notifsService = notifsService
        this.eventsService = eventsService
        this.usersService = usersService
    }

    getRoutes() {
        const that = this
        return [
            new Route("askToF", "POST", true, async function (req, res) {
                const frontAskToF = req.body
                const user = await that.usersService.getUserByName(req.user.username)
                const newNotif = new Notif("Baiser ?", EnumNotifTypes.wantToF, "Veux-tu baiser avec moi ?", 1, {idPersonA:user._id,isProtected:frontAskToF.protected})
                that.notifsService.createNotifForOneUser(frontAskToF.idPerson, newNotif)
                return res.status(200).json(newNotif)
            }),
            new Route("respondToF", "POST", true, async function (req, res) {
                const frontRespondToF = req.body
                const user = await that.usersService.getUserByName(req.user.username)
                let currentNotif = await that.notifsService.getNotifByID(frontRespondToF.idNotif)
                if(currentNotif == null){
                    return res.status(400)
                }
                await that.notifsService.deleteNotifByID(currentNotif._id.toString())
                const newEvent = new Event(currentNotif.data.idPersonA, user._id, currentNotif.isProtected, [])
                await that.eventsService.createEventForBothUsers(newEvent)
                return res.status(200).send()
            })
        ]
    }
}