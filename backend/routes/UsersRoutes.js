import User from "../model/User.js"
import Route from "./Route.js"
import { generateAccessToken } from "../utils/jwt.js"

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
            }),
            new Route("register", "POST", false, async function (req, res) {
                const frontUser = req.body.user
                if (await that.usersService.getUserByName(frontUser.pseudo) !== null) {
                    return res.status(403).send()
                }
                const user = new User(frontUser.pseudo, frontUser.password, frontUser.description, frontUser.gender, true)
                that.usersService.createUser(user)
                return res.status(200).json({token: generateAccessToken(frontUser.pseudo)})
            }),
            new Route("connect", "GET", false, async function (req, res) {
                const frontUser = req.body.user
                const user = await that.usersService.getUserByName(frontUser.pseudo)
                if (user !== null && user.password === frontUser.password) {
                    return res.status(200).json({token: generateAccessToken(frontUser.pseudo)})
                }
                return res.status(403).send()
            })
        ]
        
    }
}