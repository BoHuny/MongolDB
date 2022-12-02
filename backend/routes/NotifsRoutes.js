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
                const newNotif = that.notifsService.askToF(user)
                return res.status(200).json(newNotif)
            }),
            new Route("respondToF", "POST", true, async function (req, res) {
                const frontRespondToF = req.body
                const response = await that.notifsService.respondToF(req.user.username, frontRespondToF)
                if(!response){
                    return res.status(400)
                }
                return res.status(200).send()
            })
        ]
    }
}