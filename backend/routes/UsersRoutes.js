import Route from "./Route.js"

export default class UsersRoutes {
    constructor(usersService) {
        this.usersService = usersService
    }

    getRoutes() {
        const that = this
        return [
            new Route("getRandomUsers", "GET", false, async function (req, res) {
                const randomUsers = await that.usersService.getRandomUsers(10)
                res.status(200).json(randomUsers)
            })
        ]
        
    }
}