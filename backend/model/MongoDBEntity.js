import { ObjectId } from "mongodb"

export default class MongoDBEntity {
    constructor(id) {
        if(id === null){
            this._id = new ObjectId
        } else {
            this._id = id
        }
    }
}