import MongoDBEntity from "./MongoDBEntity.js";

export default class Event extends MongoDBEntity{
    constructor(idPersonA, idPersonB, isProtected, listDiseasesTransmitted, date = null){
        super()
        if(date === null){
            this.date = new Date()
        } else {
            this.date = date
        }
        this.idPersonA = idPersonA
        this.idPersonB = idPersonB
        this.isProtected = isProtected
        this.listDiseasesTransmitted = listDiseasesTransmitted
    }
}