import { ObjectId } from "mongodb"

export default class MongoDBEntity {
    constructor() {
        if(id === null){
            this._id = new ObjectId
        } else {
            this._id = id
        }
    }
}