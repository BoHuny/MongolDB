import User from "../model/User.js"

export default class UsersService {
    constructor(client) {
        this.client = client
    }

    getUsers() {
        return new User("coucou")
    }

    getUserByID(idUser){
        const queryUser = { _id: idUser}
        const optionUser = {}
        let user = await this.usersCollection.findOne(queryUser, optionUser);
        return user
    }
}