import { ObjectId } from "mongodb";
import User from "../model/User.js"

export default class UsersService {
    constructor(database) {
        this.database = database
        this.usersCollection = database.collection('users')
    }

    async getRandomUsers(sampleSize) {
        const mongoUsers = this.usersCollection.aggregate([{$sample: { size: sampleSize}}])
        const users = []
        for await (const user of mongoUsers) {
            users.push(user)
        }
        return users
    }

    async getUsers() {
        const mongoUsers = await this.usersCollection.find({}).toArray()
        return mongoUsers
    }

    createUser(user) {
        let result = this.usersCollection.insertOne(user);
        return result
    }

    async addNotifID(userID, notifID) {
        const filter = { _id: new ObjectId(userID) };
        const update = {
            $addToSet: {
                listNotifs: new ObjectId(notifID)
            },
        };
        const options = { upsert: true };
        const result = await this.usersCollection.updateOne(filter, update, options);
        return result
    }

    async addDiseaseID(userID, diseaseID){
        let user = await this.getUserByID(userID)
        if(!user.listDiseases.some(function(diseaseObjectID, index, array){userID === diseaseObjectID.toString()})){
            const filter = { _id: new ObjectId(userID) }
            const update = {
                $addToSet: {
                    listDiseases: {
                        diseaseID: new ObjectId(diseaseID),
                        startTime: new Date()
                    }
                },
            };
            const options = { upsert: true };
            const result = await this.usersCollection.updateOne(filter, update, options);
            return result
        }
    }

    async getUserByID(idUser) {
        const queryUser = { _id: new ObjectId(idUser)}
        const optionUser = {}
        let user = await this.usersCollection.findOne(queryUser, optionUser);
        return user
    }

    async getUserByName(pseudo) {
        const queryUser = { pseudo: pseudo}
        const optionUser = {}
        let user = await this.usersCollection.findOne(queryUser, optionUser);
        return user
    }
}