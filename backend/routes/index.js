import Bot from "../model/Bot.js"
import NotifsRoutes from "./NotifsRoutes.js"
import Route from "./Route.js"
import UsersRoutes from "./UsersRoutes.js"
import { getTimeLeft } from "../utils/mainEvent.js"
import { act } from "../utils/mainEvent.js"

export default (services) => {
    act(services["users"])
    const routesObjects = [
        new UsersRoutes(services["users"]),
        new NotifsRoutes(services["notifs"], services["events"], services["users"], services["diseases"])
    ]
    let routes = [
        new Route("", "GET", true, function (req, res) {
            res.redirect("homepage.html");
            res.status(200).send()
        }),
        new Route("welcome", "GET", false, function(req, res) {
            res.redirect("welcome.html");
            res.status(200).send()
        }),
        new Route("getTimeLeft", "GET", false, function(req, res) {
            res.status(200).json(getTimeLeft())
        }),
        new Route("getStats", "GET", false, async function(req, res) {
            res.status(200).json(await services["users"].getLastSession())
        })
    ]

    for (let i = 0; i < routesObjects.length; i++) {
        routes = routes.concat(routesObjects[i].getRoutes())
    }

    return routes
}

