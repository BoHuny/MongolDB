export default class UsersRoutes {
    constructor(usersService) {
        this.usersService = usersService
    }

    getRoutes() {
        const that = this
        return {
            "user":["GET", function (req, res) {
                const user = that.usersService.getUsers()
                res.status(200).json(user)
            }]
        }
    }
}