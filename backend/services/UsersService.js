import User from "../model/User.js"

export default class UsersService {
    constructor(client) {
        this.client = client
    }

    getUsers() {
        return new User("coucou")
    }
}