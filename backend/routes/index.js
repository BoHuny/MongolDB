import NotifsRoutes from "./NotifsRoutes.js"
import Route from "./Route.js"
import UsersRoutes from "./UsersRoutes.js"



export default (services) => {
    const routesObjects = [
        new UsersRoutes(services["users"]),
        new NotifsRoutes(services["notifs"], services["events"], services["users"])
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

