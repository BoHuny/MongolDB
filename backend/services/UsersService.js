import { ObjectId } from "mongodb";
import Session from "../model/Session.js";
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

    async addEventID(userID, eventID) {
        const filter = { _id: new ObjectId(userID) };
        const update = {
            $addToSet: {
                listEvents: new ObjectId(eventID)
            },
            $inc:{
                shownScore: 20,
                realScore: 20
            }
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

    async deleteNotifByID(idUser, idNotif){
        const filter = { _id: new ObjectId(idUser) }
            const update = {
                $pull: {
                    listNotifs: new ObjectId(idNotif)
                },
            };
            const options = { upsert: true };
            const result = await this.usersCollection.updateOne(filter, update, options);
            return result
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

    async resetAllUsers() {
        await this.usersCollection.updateMany({}, {
            $set: {
                shownScore: 0,
                realScore: 0,
                listDiseases: [],
                listNotifs: [],
                listEvents: []
            }
        });
    }

    async setLastSession() {
        const users = await this.getUsers()
        users.sort(function(u1, u2) {
            if (u1.realScore > u2.realScore) return -1;
            if (u1.realScore < u2.realScore) return 1;
        })
        const bestUsersID = []
        const bestScores = []
        let numberDiseases = 0
        for (let i = 0; i < users.length; i++) {
            if (users[i].listDiseases.length > 0) {
                numberDiseases++;
            }
        }
        for (let i = 0; i < Math.min(users.length, 3); i++) {
            bestUsersID.push(users[i]._id)
            bestScores.push(users[i].realScore)
        }
        const proportionDiseases = numberDiseases / users.length
        const session = new Session(proportionDiseases, bestUsersID, bestScores)
        const sessionCollection = this.database.collection("sessions")
        sessionCollection.insertOne(session)
    }

    async getLastSession() {
        const sessionCollection = this.database.collection("sessions")
        const session = sessionCollection.find().limit(1).sort({$natural:-1})
        const okSession = []
        for await (const s of session) {
            okSession.push(s)
        }
        return okSession
    }
}