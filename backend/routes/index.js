import NotifsRoutes from "./NotifsRoutes.js"
import UsersRoutes from "./UsersRoutes.js"



export default (services) => {
    const routesObjects = [
        new NotifsRoutes(services["notifs"]),
        new UsersRoutes(services["users"])
    ]
    
    let routes = {
        "":["GET", function (req, res) {
            res.send('Hello World!')
            res.status(200).send()
        }]
    }

    for (let i = 0; i < routesObjects.length; i++) {
        routes = Object.assign({}, routes, routesObjects[i].getRoutes())
    }

    return routes
}

