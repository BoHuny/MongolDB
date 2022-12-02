import Bot from "../model/Bot.js"
import NotifsRoutes from "./NotifsRoutes.js"
import Route from "./Route.js"
import UsersRoutes from "./UsersRoutes.js"


export default (services) => {
    console.log(new Bot())
    const routesObjects = [
        new NotifsRoutes(services["notifs"]),
        new UsersRoutes(services["users"])
    ]
    
    let routes = [
        new Route("", "GET", true, function (req, res) {
            res.send   ("Authentified!")
            res.status(200).send()
        }),
        new Route("welcome", "GET", false, function(req, res) {
            res.send("Welcome!")
            res.status(200).send()
        })
    ]

    for (let i = 0; i < routesObjects.length; i++) {
        routes = routes.concat(routesObjects[i].getRoutes())
    }

    return routes
}

