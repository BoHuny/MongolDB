export default class UsersRoutes {
    constructor(userService) {
        this.userService = userService
    }

    getRoutes() {
        return {
            "user":["GET", function (req, res) {
                res.send('Hello user!')
                res.status(200).send()
            }]
        }
    }
}