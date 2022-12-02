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
                const newNotif = await that.notifsService.askToF(req.user.username, frontAskToF)
                return res.status(200).json(newNotif).send()
            }),
            new Route("respondToF", "POST", true, async function (req, res) {
                const frontRespondToF = req.body
                const currentNotif = await that.notifsService.respondToF(req.user.username, frontRespondToF)
                if(currentNotif == null){
                    return res.status(400).send()
                }
                return res.status(200).send()
            })
        ]
    }
}