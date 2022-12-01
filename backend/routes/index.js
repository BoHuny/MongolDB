import NotifsRoutes from "./NotifsRoutes.js"
import Route from "./Route.js"
import UsersRoutes from "./UsersRoutes.js"



export default (services) => {
    const routesObjects = [
        new NotifsRoutes(services["notifs"]),
        new UsersRoutes(services["users"])
    ]
    
    let routes = [new Route("", "GET", false, function (req, res) {
            res.send("Hello world!")
            res.status(200).send()
        })
    ]

    for (let i = 0; i < routesObjects.length; i++) {
        routes = routes.concat(routesObjects[i].getRoutes())
    }

    return routes
}

