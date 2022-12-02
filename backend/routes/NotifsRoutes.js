import Route from "./Route.js"

export default class NotifsRoutes {
    constructor(notifsService) {
        this.notifsService = notifsService
    }

    getRoutes() {
        const that = this
        return [
            new Route("askToF", "GET", false, async function (req, res) {
                const randomUsers = await that.usersService.getRandomUsers(10)
                res.status(200).json(randomUsers)
            }),
        ]
    }
}