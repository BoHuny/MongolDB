import { ObjectId } from "mongodb"

export default class EventsService {
    constructor(database, userService) {
        this.database = database
        this.eventsCollection = database.collection('events')
        this.userService = userService
    }

    async createEvent(event){
        let result = this.eventsCollection.insertOne(event);
        return result
    }

    async createEventForBothUsers(event) {
        await this.createEvent(event);
        await this.userService.addEventID(event.idPersonA, event._id.toString())
        await this.userService.addEventID(event.idPersonB, event._id.toString())
    }

}