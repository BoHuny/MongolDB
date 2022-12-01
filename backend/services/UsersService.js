import User from "../model/User.js"

export default class UsersService {
    constructor(database) {
        this.database = database
        this.usersCollection = database.collection('users')
    }

    getUsers() {
        return new User("coucou")
    }

    createUser(user){
        let result = this.usersCollection.insertOne(user);
        return result
    }

    async addNotifID(userID, notifID){
        const filter = { _id: userID };
        const update = {
            $addToSet: {
                listNotifs: notifID
            },
        };
        const options = { upsert: true };
        const result = await this.usersCollection.updateOne(filter, update, options);
        return result
    }

    async getUserByID(idUser){
        const queryUser = { _id: idUser}
        const optionUser = {}
        let user = await this.usersCollection.findOne(queryUser, optionUser);
        return user
    }
}